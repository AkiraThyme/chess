<template>
    <div class="timer-header">
      <div class="player white-player" :class="{ active: store.turn === 'white' }">
        <img class="piece-icon" src="../../assets/images/pieces/staunton/basic/White-Knight-Flipped.png" alt="White Knight">
        <div class="player-info">
          <h5 class="player-name">{{ store.board.whitePlayer || 'White' }}</h5>
          <p class="player-time">{{ store.times.white | timeBoard }}</p>
        </div>
      </div>
  
      <div class="vs-text">
        <h5>vs</h5>
      </div>
  
      <div class="player black-player" :class="{ active: store.turn === 'black' }">
        <div class="player-info">
          <h5 class="player-name">{{ store.board.blackPlayer || 'Black' }}</h5>
          <p class="player-time">{{ store.times.black | timeBoard }}</p>
        </div>
        <img class="piece-icon" src="../../assets/images/pieces/staunton/basic/Black-Knight-Flipped.png" alt="Black Knight">
      </div>
    </div>
  </template>
  
  <script setup>
  import { useGameStore } from '../../store/store'
  import { ref, watchEffect } from 'vue'
  
  const store = useGameStore()
  
  // Watch for the turn change to update the timer
  watchEffect(() => {
    if (store.turn === 'white') {
      store.startTimer()
    } else {
      store.startTimer()
    }
  })
  
  const timeBoard = (time) => {
    // Format time as mm:ss
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  </script>
  
  <style scoped>
  .timer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #f5f5f5;
    /* border-radius: 8px; */
    margin-top: 20px;
    width: 601px;  /* Ensure it takes up the full width of its parent */
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  
  .player {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: -3px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    flex-direction: row-reverse;
    flex: 1;  /* Allow players to take equal space */
  }
  
  .player-info {
    text-align: center;
    flex: 1;
  }
  
  .player-name {
    font-weight: bold;
  }
  
  .player-time {
    font-size: 1.2em;
  }
  
  .piece-icon {
    height: 80px;
    position: relative;
  }
  
  .vs-text {
    font-size: 1.5em;
    font-weight: bold;
    padding: 0 20px;
  }
  
  .active {
    background-color: #D8B980;
  }
  </style>
  