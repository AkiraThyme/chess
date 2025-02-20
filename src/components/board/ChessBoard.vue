<template>
  <div class="game-container">
    <div>
      <BoardTimer />
    </div>

    <div class="game-content">
      <div class="chat-container">
        <Chat v-if="shouldShowChat" :playerColor="playerColor" />
      </div>

      <div class="chessboard-container">
        <div ref="board" class="chessboard blue"></div>
      </div>

      <div class="history-container">
        <PgnHistory :history="moveHistory" />
      </div>

      <ToggleableIcon v-model:pieceIds="listItems" />

      <!-- Piece selection list where dragged pieces will be dropped -->
      <div class="piece-list" @dragover.prevent @drop="onDrop">
        <h4>Selected Pieces</h4>
        <ul>
          <li v-for="(piece, index) in listItems" :key="index">{{ piece }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../../store/store';
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import {
  InitializeFromFen,
  Search,
  FormatMove,
  ResetGame,
  GenerateValidMoves
} from '../../js/chess/engine';
import BoardTimer from '../util/BoardTimer.vue';
import PgnHistory from '../util/PgnHistory.vue';
import Chat from '../chat/Chat.vue';
import Swal from 'sweetalert2';
import socket from '../../services/socket'; 
import ToggleableIcon from '../util/ToggleableIcon.vue';

export default {
  props: {
    theme: { type: String, default: 'marble' },
    pieceStyle: { type: String, default: 'cburnett' }
  },
  components: { BoardTimer, PgnHistory, Chat, ToggleableIcon },
  data() {
    return {
      chess: new Chess(),
      board: null,
      moveHistory: [],
      isGameOver: false,
      isPlayerVsPlayer: false,
      playerColor: null,
      opponentFound: false,
      selectedTheme: this.theme,
      listItems: [],
      selectedPiece: 'none'
    };
  },
  computed: {
    computedTheme() {
      return this.selectedTheme ? `chessground ${this.selectedTheme}` : "chessground marble";
    },
    shouldShowChat() {
      return this.isPlayerVsPlayer && this.opponentFound;
    }
  },
  watch: {
    selectedTheme() {
      this.updateTheme();
    }
  },
  created() {
    socket.on('assignColor', this.handleAssignColor);
    socket.on('gameOver', this.handleGameOver);
    socket.on('defaultWin', this.handleDefaultWin);
    socket.on('matchFound', this.handleMatchFound);
    socket.on('move', this.handleMove);
    socket.on('opponentDisconnected', this.handleOpponentDisconnected);
    socket.on('noOpponentFound', this.handleNoOpponentFound);

    ResetGame();
  },
  mounted() {
    this.showModeSelectionPopup();
  },
  methods: {
    initializeBoard() {
      if (!this.$refs.board) return;

      this.board = Chessground(this.$refs.board, {
        orientation: this.playerColor === 'black' ? 'black' : 'white',
        viewOnly: false,
        turnColor: 'white',
        animation: { duration: 300 },
        movable: {
          free: false,
          premove: true,
          dests: this.getLegalMoves(),
          events: { after: this.onUserMove,
            dragStart: (source, piece) => {
              console.log('Drag started from:', source, 'Piece:', piece); // Log to check what is being dragged
              if (!this.listItems.includes(piece)) {
                this.listItems.push(piece); // Add the piece to the list if it's not already there
              }
            },
           },
        },
        highlight: { lastMove: true, check: true },
        drawable: { enabled: true },
        showDests: true,
      });

      this.updateBoard();
    },

    // Handle when a piece is dropped onto the list
    onDrop(event) {
      event.preventDefault(); // Make sure to prevent default drop action
      const droppedPiece = event.dataTransfer.getData("piece");
      console.log('Dropped Piece:', droppedPiece);
      
      if (droppedPiece && !this.listItems.includes(droppedPiece)) {
        this.listItems.push(droppedPiece);
        console.log('Updated List:', this.listItems);
      } else {
        console.log('Piece already in the list or invalid drop');
      }
    },

    handleAssignColor(data) {
      if (data?.color) {
        this.playerColor = data.color;
        this.opponentFound = true;
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Opponent Found!',
          text: `You are playing as ${data.color.toUpperCase()}.`,
          timer: 2000,
          showConfirmButton: false
        });

        this.initializeBoard();
      } else {
        console.error('Invalid assignColor data:', data);
      }
    },

    handleGameOver(data) {
      Swal.fire({
        title: 'Game Over',
        text: data.resultMessage,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Find New Opponent',
        denyButtonText: 'Analyze Board',
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGamePrompt();
        } else if (result.isDenied) {
          this.analyzeBoard();
        }
      });
    },

    handleDefaultWin(data) {
      Swal.fire({
        icon: 'info',
        title: 'Default Win',
        text: `Opponent ran out of time. ${data.winnerColor === 'white' ? 'White' : 'Black'} wins!`,
        confirmButtonText: 'OK'
      }).then(() => {
        this.resetGamePrompt();
        socket.disconnect();
      });
    },

    handleMatchFound() {
      this.opponentFound = true;
      Swal.fire({
        icon: 'info',
        title: 'Match Found!',
        text: 'Your opponent is ready. Good luck!',
        timer: 2000,
        showConfirmButton: false
      });
    },

    handleMove(data) {
      if (this.isPlayerVsPlayer && data?.from && data?.to) {
        const move = this.chess.move({ from: data.from, to: data.to });
        if (move) {
          this.moveHistory.push(move);
          this.updateBoard();
          this.switchTurn();
        } else {
          console.error('Invalid move received from socket:', data);
        }
      }
    },

    handleOpponentDisconnected() {
      Swal.fire('Opponent Disconnected', 'Your opponent left the game.', 'warning').then(() => {
        this.resetGamePrompt();
      });
    },

    handleNoOpponentFound() {
      Swal.fire('No Opponent Found', 'Try again later or play vs AI.', 'info');
      this.isPlayerVsPlayer = false;
      this.initializeBoard();
      this.showModeSelectionPopup();
    },

    updateListItems(newItems) {
      this.listItems = newItems;
      this.updateBoard();
    },

    updateBoard() {
      if (!this.board) return;
      const dests = this.getLegalMoves();
      this.board.set({
        fen: this.chess.fen(),
        turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
        movable: {
          dests: dests,
          events: { after: this.onUserMove }
        }
      });
    },

    updateTheme() {
      document.documentElement.setAttribute('data-theme', this.selectedTheme);
      const board = this.$refs.board;
      if (board) {
        board.className = `chessboard ${this.selectedTheme}`;
      }
    },

    analyzeBoard() {
      Swal.fire({
        title: 'Analysis Mode',
        text: 'Feature under development! You can manually review moves in the history.',
        icon: 'info'
      });
    },

    onUserMove(orig, dest) {
      if (this.isPlayerVsPlayer && this.chess.turn() !== this.playerColor[0]) {
        console.log('Not your turn!');
        this.updateBoard();
        return;
      }

      const move = this.chess.move({ from: orig, to: dest });
      if (move) {
        this.moveHistory.push(move);
        this.updateBoard();
        this.checkGameOver();

        if (this.isPlayerVsPlayer) {
          socket.emit('move', { from: orig, to: dest, fen: this.chess.fen() });
        } else {
          this.makeEngineMove();
        }
      } else {
        this.updateBoard();
      }
    },

    makeEngineMove() {
      if (this.isPlayerVsPlayer) return;

      InitializeFromFen(this.chess.fen());
      setTimeout(() => {
        Search((bestMove) => {
          if (bestMove) {
            const move = FormatMove(bestMove);
            const appliedMove = this.chess.move(move);
            if (appliedMove) {
              this.moveHistory.push(appliedMove);
              this.updateBoard();
              this.checkGameOver();
            }
          }
        }, 8, null);
      }, 500);
    },

    getLegalMoves() {
      InitializeFromFen(this.chess.fen());
      const dests = new Map();
      const moves = GenerateValidMoves();

      moves.forEach((move) => {
        const formattedMove = FormatMove(move);
        const from = formattedMove.substring(0, 2);
        const to = formattedMove.substring(2, 4);

        // If a piece is selected and it doesn't match the moving piece, don't show its move highlights
        if (this.selectedPiece === 'none' || this.selectedPiece === this.chess.get(from[0]).type) {
          if (!dests.has(from)) dests.set(from, []);
          dests.get(from).push(to);
        }
      });

      return dests;
    },

    switchTurn() {
      const store = useGameStore();
      store.switchTurn();
      this.updateBoard();
      store.startTimer();
    },

    checkGameOver() {
      if (this.chess.isCheckmate() || this.chess.isDraw() || this.chess.isStalemate()) {
        this.isGameOver = true;
        let resultMessage = this.chess.isCheckmate()
          ? `${this.chess.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`
          : this.chess.isStalemate()
          ? 'Stalemate! The game is a draw.'
          : 'Draw by insufficient material or other rule.';

        if (this.isPlayerVsPlayer) {
          socket.emit('gameOver', { resultMessage });
        }

        Swal.fire({
          title: 'Game Over',
          text: resultMessage,
          icon: 'info',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Find New Opponent',
          denyButtonText: 'Analyze Board',
          cancelButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            this.resetGamePrompt();
          } else if (result.isDenied) {
            this.analyzeBoard();
          }
        });
      }
    },

    resetGamePrompt() {
      this.chess.reset();
      this.moveHistory = [];
      this.isGameOver = false;
      this.opponentFound = false;
      this.showModeSelectionPopup();
    },

    showModeSelectionPopup() {
      Swal.fire({
        title: 'Choose Game Mode',
        text: 'Play vs AI or Find a Player?',
        icon: 'question',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: 'Play vs AI',
        cancelButtonText: 'Find Player',
        customClass: {
          confirmButton: 'custom-ai-btn',
          cancelButton: 'custom-player-btn'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.isPlayerVsPlayer = false;
          this.opponentFound = false;
          this.initializeBoard();
        } else {
          this.isPlayerVsPlayer = true;
          this.findOpponent();
        }
      });
    },

    findOpponent() {
      if (!this.isPlayerVsPlayer) return;

      Swal.fire({
        title: 'Finding Player...',
        text: 'Please wait while we find an opponent.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      socket.emit('findOpponent');
    }
  },

  beforeUnmount() {
    socket.disconnect();
  },
};
</script>

<style>
@import "/node_modules/chessground/assets/chessground.base.css";
@import "/node_modules/chessground/assets/chessground.brown.css";
@import "/node_modules/chessground/assets/chessground.cburnett.css";
@import '../../base.css';
@import '../../theme.css';

.cg-board {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  background-color: red; /* Light squares */
  background-size: cover;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 90vh;
}

.chat-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-right: 10px;
}

.game-content {
  display: flex;
  justify-content: space-between;
  width: 88%;
  height: 69vh;
  padding: 10px;
  overflow: hidden;
}

.chessboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83%;
  height: 100%;
}

.history-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 30%;
  height: 100%;
  padding-left: 10px;
  overflow-y: auto;
}

.chessboard {
  width: 90vmin;
  height: 90vmin;
  max-width: 600px;
  max-height: 600px;
  aspect-ratio: 1 / 1;
}

.custom-ai-btn {
  background-color: #4CAF50 !important;
  color: white !important;
  border: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}

.custom-player-btn {
  background-color: #F44336 !important;
  color: white !important;
  border: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}

.custom-ai-btn:hover {
  background-color: #45a049 !important;
}

.custom-player-btn:hover {
  background-color: #e53935 !important;
}

/* Styling for the piece selection list */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 5px 10px;
  background-color: #f4f4f4;
  margin: 5px;
  border-radius: 4px;
}

li:hover {
  background-color: #dcdcdc;
}

li.selected {
  background-color: #a0c4ff;
}

/* Style for the drop area */
.piece-list {
  padding: 10px;
  border: 2px dashed #ccc;
  margin-top: 20px;
  width: 200px;
  min-height: 100px;
  text-align: center;
}

.piece-list h4 {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
