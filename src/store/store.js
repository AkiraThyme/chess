import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('gameStore', () => {
  const whitePlayer = ref('White Player');
  const blackPlayer = ref('Black Player');
  const board = ref({
    whitePlayer: whitePlayer.value,
    blackPlayer: blackPlayer.value,
    boardState: '',
    moveHistory: [],
    wins: null,
    pgn: '',
  });

  const baseTime = 60;
  const increment = 5;
  const gameStarted = ref(false);

  const times = ref({
    white: baseTime,
    black: baseTime
  });

  const turn = ref('white');

  const whiteTimerInterval = ref(null);
  const blackTimerInterval = ref(null);

  const updatePlayerNames = (whiteName, blackName) => {
    whitePlayer.value = whiteName;
    blackPlayer.value = blackName;
    board.value.whitePlayer = whiteName;
    board.value.blackPlayer = blackName;
  };

  const startTimer = (color) => {
    if (!gameStarted.value) return;

    stopTimer(color); // Ensure there's no multiple intervals

    if (color === 'white') {
      whiteTimerInterval.value = setInterval(() => {
        times.value.white -= 1;
        if (times.value.white <= 0) stopTimer('white');
      }, 1000);
    } else {
      blackTimerInterval.value = setInterval(() => {
        times.value.black -= 1;
        if (times.value.black <= 0) stopTimer('black');
      }, 1000);
    }
  };

  const stopTimer = (color) => {
    if (color === 'white' && whiteTimerInterval.value) {
      clearInterval(whiteTimerInterval.value);
      whiteTimerInterval.value = null;
    } else if (color === 'black' && blackTimerInterval.value) {
      clearInterval(blackTimerInterval.value);
      blackTimerInterval.value = null;
    }
  };

  const switchTurn = () => {
    if (!gameStarted.value) gameStarted.value = true;

    if (turn.value === 'white') {
      times.value.white += increment; // Add increment to white after the move
      stopTimer('white');
      turn.value = 'black';
      startTimer('black');
    } else {
      times.value.black += increment; // Add increment to black after the move
      stopTimer('black');
      turn.value = 'white';
      startTimer('white');
    }
  };

  const resetGame = () => {
    stopTimer('white');
    stopTimer('black');

    times.value = { white: baseTime, black: baseTime };
    turn.value = 'white';
    gameStarted.value = false;

    board.value = {
      whitePlayer: whitePlayer.value,
      blackPlayer: blackPlayer.value,
      boardState: '',
      moveHistory: [],
      wins: null,
      pgn: ''
    };
  };

  return {
    whitePlayer,
    blackPlayer,
    board,
    times,
    turn,
    gameStarted,
    updatePlayerNames,
    resetGame,
    startTimer,
    stopTimer,
    switchTurn,
  };
});
