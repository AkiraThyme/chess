import { defineStore } from 'pinia';
import { Chess } from 'chess.js';

export const useLStorage = defineStore('lstorage', {
  state: () => ({
    chess: null, // Will initialize in setup
    fen: 'start', // Default FEN
    legalMoves: new Map()
  }),

  actions: {
    initializeBoard() {
      if (!this.chess) {
        this.chess = new Chess();
      }
      this.fen = this.chess.fen();
      this.updateLegalMoves();
    },

    makeMove(from, to) {
      if (!this.chess) return null;
      
      const move = this.chess.move({ from, to });
      if (move) {
        this.fen = this.chess.fen();
        this.updateLegalMoves();
        return move;
      }
      return null;
    },

    updateLegalMoves() {
      if (!this.chess) return;

      const dests = new Map();
      this.chess.SQUARES.forEach(square => {
        const moves = this.chess.moves({ square, verbose: true });
        if (moves.length) dests.set(square, moves.map(m => m.to));
      });

      this.legalMoves = dests;
    }
  }
});
