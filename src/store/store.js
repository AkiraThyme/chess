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

  const baseTime = 60;  // Starting time for each player
  const increment = 5;  // Increment per move in seconds
  const gameStarted = ref(false);  // Flag to track whether the game has started

  const times = ref({
    white: baseTime,
    black: baseTime
  });

  const turn = ref('white');

  const updatePlayerNames = (whiteName, blackName) => {
    whitePlayer.value = whiteName;
    blackPlayer.value = blackName;
    board.value.whitePlayer = whiteName;
    board.value.blackPlayer = blackName;
  };

  const startTimer = () => {
    if (!gameStarted.value) return;  // Don't start the timer if the game hasn't started
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(decrementTime, 1000);
  };

  const decrementTime = () => {
    if (turn.value === 'white') {
      times.value.white -= 1;
    } else if (turn.value === 'black') {
      times.value.black -= 1;
    }
    if (times.value.white <= 0 || times.value.black <= 0) {
      clearInterval(countdownInterval);
    }
  };

  const switchTurn = () => {
    if (!gameStarted.value) {
      gameStarted.value = true;  // Mark the game as started after the first move
    }
  
    // Reset the timer to baseTime for the current player after moving
    if (turn.value === 'white') {
      times.value.white = baseTime;
    } else if (turn.value === 'black') {
      times.value.black = baseTime;
    }
  
    // Switch turns
    turn.value = turn.value === 'white' ? 'black' : 'white';
  
    startTimer();  // Start timer for the next player
  };
  

  const stopTimer = () => {
    clearInterval(countdownInterval);
  };

  const resetGame = () => {
    times.value = { white: baseTime, black: baseTime };
    turn.value = 'white';
    gameStarted.value = false;  // Reset gameStarted flag
    board.value = {
      whitePlayer: whitePlayer.value,
      blackPlayer: blackPlayer.value,
      boardState: '',
      moveHistory: [],
      wins: null,
      pgn: ''
    };
  };

  let countdownInterval = null;

  return {
    whitePlayer,
    blackPlayer,
    board,
    times,
    turn,
    gameStarted,  // Export gameStarted flag
    updatePlayerNames,
    resetGame,
    startTimer,
    stopTimer,
    switchTurn,
  };
});
