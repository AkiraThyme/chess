<template>
  <div class="game-container" :class="computedTheme" >
    <div>
      <BoardTimer />
    </div>

    <!-- Wrap the board and history side-by-side -->
    <div class="game-content">
      <div class="chessboard-container">
        <div ref="board" class="chessboard"></div>
      </div>

      <div class="history-container">
        <PgnHistory :history="moveHistory" />
      </div>
    </div>
  </div>
</template>


<script>
import { useGameStore } from '../../store/store'; // Ensure the import path is correct
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import { InitializeFromFen, Search, FormatMove, ResetGame, GenerateValidMoves } from '../../js/chess/engine'; // Adjust path if needed
import BoardTimer from '../util/BoardTimer.vue';
import PgnHistory from '../util/PgnHistory.vue';
import Swal from 'sweetalert2';


export default {
  props: {
    theme: {
      type: String,
      default: 'marble'
    },
    pieceStyle: {
      type: String,
      default: 'cburnett'
    }
  },
  data() {
    return {
      chess: new Chess(),
      board: null,
      moveHistory: [],
      isGameOver: false,
    };
  },
  components: { BoardTimer, PgnHistory },
  computed: {
    computedTheme() {
      return this.theme ? `theme-${this.theme}` : 'theme-wood2';
    },
    computedPieceStyle() {
      return this.pieceStyle || 'cburnett';
    }
  },
  created() {
    this.chess = new Chess();
    ResetGame(); // Ensure engine resets before board initializes
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeBoard();
    });
  },
  methods: {
    initializeBoard() {
      if (!this.$refs.board) {
        console.error("Board reference not found!");
        return;
      }

      this.board = Chessground(this.$refs.board, {
        viewOnly: false,
        turnColor: 'white',
        animation: { duration: 300 },
        movable: {
          free: true,
          premove: true,
          dests: this.getLegalMoves(),
          events: { after: this.onUserMove }
        },
        highlight: { lastMove: true, check: true },
        fen: "start",
        drawable: { enabled: true },
        showDests: true
      });

      // Force a redraw after mounting
      this.$nextTick(() => {
        if (this.board) {
          this.board.redrawAll();
        }
      });

      this.updateBoard();
    },
    updateBoard() {
      if (!this.board) return;
      this.board.set({
        fen: this.chess.fen(),
        movable: { dests: this.getLegalMoves() }
      });
      console.log("Board updated with FEN:", this.chess.fen());
    },
    onUserMove(orig, dest) {
      console.log("User move attempt:", { from: orig, to: dest });

      const legalMoves = this.getLegalMoves();
      if (!legalMoves.has(orig) || !legalMoves.get(orig).includes(dest)) {
        console.error("Invalid move! Reverting...");
        this.board.set({ fen: this.chess.fen() });
        return;
      }

      const move = this.chess.move({ from: orig, to: dest });
      if (move) {
        this.moveHistory.push(move);
        console.log("Move applied:", move);
        this.updateBoard();
        this.checkGameOver(); // <<<<<<<<<< ADD THIS LINE
        if (!this.isGameOver) {
          this.switchTurn();
          this.makeEngineMove();
        }
      } else {
        console.error("Invalid move execution! Reverting...");
        this.board.set({ fen: this.chess.fen() });
      }
    },

    makeEngineMove() {
      console.log("AI is thinking...");

      InitializeFromFen(this.chess.fen());

      setTimeout(() => {
        Search((bestMove) => {
          console.log("Search returned:", bestMove);

          if (bestMove) {
            const move = FormatMove(bestMove);
            const appliedMove = this.chess.move(move);

            if (appliedMove) {
              this.moveHistory.push(appliedMove);
              console.log("AI move applied:", appliedMove);
              this.updateBoard();
              this.checkGameOver(); // <<<<<<<<<< ADD THIS LINE
              if (!this.isGameOver) {
                this.switchTurn();
              }
            } else {
              console.error("Engine move was invalid:", move);
            }
          } else {
            console.warn("No engine move found.");
          }
        }, 8, null);
      }, 1000);
    },
    getLegalMoves() {
      InitializeFromFen(this.chess.fen()); // Sync engine state

      const dests = new Map();
      const moves = GenerateValidMoves(); // Get valid moves from engine

      if (!Array.isArray(moves) || moves.length === 0) {
        console.warn("No valid moves found.");
        return dests;
      }

      moves.forEach(move => {
        const formattedMove = FormatMove(move); // Ensure the move is correctly formatted
        if (formattedMove.length < 4) return;

        const from = formattedMove.slice(0, 2); // Extract "e2"
        const to = formattedMove.slice(2, 4);   // Extract "e4"

        if (!dests.has(from)) {
          dests.set(from, []);
        }
        dests.get(from).push(to);
      });

      console.log("Formatted legal moves:", dests);
      return dests;
    },
    switchTurn() {
      const store = useGameStore();
      store.switchTurn();  // Switch turn in store
      this.startTimer();   // Start timer for the next player
    },
    startTimer() {
      const store = useGameStore();
      store.startTimer();  // Start the timer from the store for the current player
    },
    moveToHistory(index) {
      if (!this.history || this.history.length === 0) {
        return; // No history data available, exit early
      }

      if (index < 0 || index >= this.history.length) {
        clearInterval(playEvent);
        this.played = false;
        return;
      }
      
      this.select = index;
      let pgnReturn = '';
      let jugada = 0;
      
      for (let i = 0; i <= index; i++) {
        if (i % 2 === 0) {
          jugada++;
          pgnReturn += `${jugada}. `;
        }
        pgnReturn += `${this.history[i].san} `;
      }

      if (!this.active) {
        this.$emit('move', { pgn: pgnReturn });
        return;
      }
      if (this.humanvspc()) {
        this.$emit('move', { pgn: pgnReturn });
      }
    },
    checkGameOver() {
      if (this.chess.isCheckmate()) {
        this.isGameOver = true;
        const winner = this.chess.turn() === 'w' ? 'Black' : 'White';
        this.showEndGamePopup(`${winner} wins by checkmate`);
      } else if (this.chess.isDraw()) {
        this.isGameOver = true;
        this.showEndGamePopup('Draw');
      } else if (this.chess.isStalemate()) {
        this.isGameOver = true;
        this.showEndGamePopup('Stalemate');
      }
    },
    showEndGamePopup(result) {
      const store = useGameStore();
      store.stopTimer();

      const message =
        result === 'Draw' ? 'The game is a Draw!' : `${result} wins by Checkmate!`;

      Swal.fire({
        title: 'Game Over!',
        text: message,
        icon: 'info',
        showDenyButton: true,
        confirmButtonText: 'Play vs AI',
        denyButtonText: 'Play vs Player',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetGame(true);
        } else if (result.isDenied) {
          this.resetGame(false);
        }
      });
    },
    resetGame(vsAI) {
      this.chess.reset();
      this.moveHistory = [];
      this.isGameOver = false;
      this.updateBoard();

      const store = useGameStore();
      store.resetTimer();

      // You can handle vsAI logic as needed
      console.log('Starting new game vs', vsAI ? 'AI' : 'Player');
    }
  },
  watch: {
    moveHistory(newVal) {
      console.log("Move history updated:", newVal);
    }
  }
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

/* Row container for chessboard and history */
.game-content {
  display: flex;
  justify-content: space-between;
  width: 55%;
  height: 69vh;
  padding: 10px;
  overflow: hidden;
  margin-left: 276px;
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
</style>
