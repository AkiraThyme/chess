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

      <ListPopup />

      <div class="history-container">
        <PgnHistory :history="moveHistory"  />
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
import socket from '../../services/socket'; // Use shared socket
import ListPopup from '../util/ListPopup.vue';

export default {
  props: {
    theme: { type: String, default: 'marble' },
    pieceStyle: { type: String, default: 'cburnett' }
  },
  components: { BoardTimer, PgnHistory, Chat, ListPopup },
  data() {
    return {
      chess: new Chess(),
      board: null,
      moveHistory: [],
      isGameOver: false,
      isPlayerVsPlayer: false,
      playerColor: null,
      opponentFound: false,
      selectedTheme: this.theme
    };
  },
  computed: {
    computedTheme() {
      console.log("Applying theme:", this.selectedTheme);
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
    socket.on('assignColor', (data) => {
      if (!data || !data.color) {
        console.error('Invalid assignColor data:', data);
        return;
      }

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
    });


    socket.on('gameOver', (data) => {
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
    });

    socket.on('defaultWin', (data) => {
      Swal.fire({
        icon: 'info',
        title: 'Default Win',
        text: `Opponent ran out of time. ${data.winnerColor === 'white' ? 'White' : 'Black'} wins!`,
        confirmButtonText: 'OK'
      }).then(() => {
        this.resetGamePrompt();
      });
    });



    socket.on('matchFound', () => {
      this.opponentFound = true;
      Swal.fire({
        icon: 'info',
        title: 'Match Found!',
        text: 'Your opponent is ready. Good luck!',
        timer: 2000,
        showConfirmButton: false
      });
    });


    socket.on('move', (data) => {
      if (!this.isPlayerVsPlayer) return;

      if (!data || !data.from || !data.to) {
        console.error('Invalid move data received:', data);
        return;
      }

      // Optional: Sync board state from `fen` if you use it in the future
      // this.chess.load(data.fen);

      const move = this.chess.move({ from: data.from, to: data.to });

      if (move) {
        this.moveHistory.push(move);
        this.updateBoard();
        this.switchTurn();
      } else {
        console.error('Invalid move received from socket:', data);
      }
    });


    socket.on('opponentDisconnected', () => {
      Swal.fire('Opponent Disconnected', 'Your opponent left the game.', 'warning').then(() => {
        this.resetGamePrompt();
      });
    });

    socket.on('noOpponentFound', () => {
      Swal.fire('No Opponent Found', 'Try again later or play vs AI.', 'info');
      this.isPlayerVsPlayer = false;
      this.initializeBoard();
    });

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
          events: { after: this.onUserMove }
        },
        // highlight: { lastMove: true, check: true },
        drawable: { enabled: true },
        // showDests: true,
        
      });

      this.updateBoard();
    },
    updateBoard() {
      if (!this.board) return;
      this.board.set({
        fen: this.chess.fen(),
        turnColor: this.chess.turn() === 'w' ? 'white' : 'black',
        movable: { dests: this.getLegalMoves() }
      });
    },
    
    updateTheme(){
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
          // Emit only essential data, avoid chess or board object
          socket.emit('move', {
            from: orig,
            to: dest,
            fen: this.chess.fen() // Optional if you want to sync state
          });
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
        if (!dests.has(from)) dests.set(from, []);
        dests.get(from).push(to);
      });

      return dests;
    },
    switchTurn() {
      const store = useGameStore();
      store.switchTurn();
      this.updateBoard();
      store.startTimer();
    },
    // checkGameOver() {
    //   if (this.chess.isCheckmate() || this.chess.isDraw() || this.chess.isStalemate()) {
    //     this.isGameOver = true;

    //     let resultMessage = this.chess.isCheckmate()
    //       ? `${this.chess.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`
    //       : this.chess.isStalemate()
    //       ? 'Stalemate! The game is a draw.'
    //       : 'Draw by insufficient material or other rule.';

    //     Swal.fire({
    //       title: 'Game Over',
    //       text: resultMessage,
    //       icon: 'info',
    //       showDenyButton: true,
    //       showCancelButton: true,
    //       confirmButtonText: 'Find New Opponent',
    //       denyButtonText: 'Analyze Board',
    //       cancelButtonText: 'Close'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         this.resetGamePrompt();
    //       } else if (result.isDenied) {
    //         this.analyzeBoard();
    //       }
    //     });

    //     // // Optionally emit the game over event to both players
    //     // if (this.isPlayerVsPlayer) {
    //     //   socket.emit('gameOver', { resultMessage });
    //     // }
    //   }
    // },

    checkGameOver() {
      if (this.chess.isCheckmate() || this.chess.isDraw() || this.chess.isStalemate()) {
        this.isGameOver = true;

        let resultMessage = this.chess.isCheckmate()
          ? `${this.chess.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`
          : this.chess.isStalemate()
          ? 'Stalemate! The game is a draw.'
          : 'Draw by insufficient material or other rule.';

        // Emit game over event to both players through the server
        if (this.isPlayerVsPlayer) {
          socket.emit('gameOver', { resultMessage });
        }

        // Show local popup for the player who detected it
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
          this.opponentFound = false; // Important to ensure chat is hidden
          this.initializeBoard();
        } else {
          this.isPlayerVsPlayer = true;
          this.findOpponent();
        }
      });
    },
    findOpponent() {
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
    // socket.disconnect();
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

/* Main game container */
.game-container {
  display: flex;
  flex-direction: column;  /* Stack Timer and Content */
  align-items: center;
  justify-content: flex-start;
  height: 90vh;  /* Full viewport height */
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 20%; /* Adjust width as needed */
  margin-right: 10px;
}

/* Row container for chessboard and history */
.game-content {
  display: flex;
  justify-content: space-between;
  width: 88%;
  height: 69vh;
  padding: 10px;
  overflow: hidden;
  margin-left: 38px;
}

/* Chessboard container */
.chessboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83%;  /* Adjust width based on preference */
  height: 100%;
}

/* History container */
.history-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30%;  /* Adjust width based on preference */
  height: 100%;
  padding-left: 10px; /* Optional for spacing */
  overflow-y: auto;
}

/* Chessboard styling */
.chessboard {
  width: 90vmin;
  height: 90vmin;
  max-width: 600px;
  max-height: 600px;
  aspect-ratio: 1 / 1;
}

/* Theme for chessboard */
/* .theme-wood2 .chessboard {
  background-image: url('../../assets/images/board/marble.jpg');
  background-size: cover;
} */

.dimmed {
  opacity: 0.5;
  pointer-events: none;
}

.custom-ai-btn {
  background-color: #4CAF50 !important; /* Green */
  color: white !important;
  border: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}

.custom-player-btn {
  background-color: #F44336 !important; /* Red */
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

.move-tooltip {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.move-tooltip ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.move-tooltip li {
  padding: 5px;
  cursor: pointer;
}

.move-tooltip li:hover {
  background-color: #f4f4f4;
}

</style>