<template>
  <div class="timer-header">
    <div class="player white-player" :class="{ active: store.turn === 'white' }">
      <img class="piece-icon" src="../../assets/images/pieces/staunton/basic/White-Knight-Flipped.png" alt="White Knight" />
      <div class="player-info">
        <h5 class="player-name">{{ store.board.whitePlayer || 'White' }}</h5>
        <p class="player-time">{{ formatTime(whiteTime) }}</p>
      </div>
    </div>

    <div class="vs-text">
      <h5>vs</h5>
    </div>

    <div class="player black-player" :class="{ active: store.turn === 'black' }">
      <div class="player-info">
        <h5 class="player-name">{{ store.board.blackPlayer || 'Black' }}</h5>
        <p class="player-time">{{ formatTime(blackTime) }}</p>
      </div>
      <img class="piece-icon" src="../../assets/images/pieces/staunton/basic/Black-Knight-Flipped.png" alt="Black Knight" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../../store/store';
import socket from '../../services/socket';

const store = useGameStore();

const whiteTime = ref(60);
const blackTime = ref(60);

let localTimerInterval = null;
let hasGameStarted = false;

// 🕐 Format the time from seconds to "mm:ss"
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const startLocalCountdown = () => {
  clearInterval(localTimerInterval);
  localTimerInterval = setInterval(() => {
    if (store.turn === 'white' && whiteTime.value > 0) {
      whiteTime.value--;
    } else if (store.turn === 'black' && blackTime.value > 0) {
      blackTime.value--;
    }

    if (whiteTime.value <= 0 || blackTime.value <= 0) {
      clearInterval(localTimerInterval);
    }
  }, 1000);
};

const stopLocalCountdown = () => {
  clearInterval(localTimerInterval);
};

const resetTimer = () => {
  whiteTime.value = 60;
  blackTime.value = 60;
  hasGameStarted = false;
  stopLocalCountdown();
};

const resetTimerOnMove = () => {
  if (store.turn === 'white') {
    whiteTime.value = 60;
  } else {
    blackTime.value = 60;
  }

  if (!hasGameStarted) {
    hasGameStarted = true;
  }

  startLocalCountdown();
};

onMounted(() => {
  socket.on('timerUpdate', (data) => {
    whiteTime.value = data.whiteTime;
    blackTime.value = data.blackTime;
    store.turn = data.turn;

    if (hasGameStarted) {
      startLocalCountdown();
    }
  });

  socket.on('move', () => {
    resetTimerOnMove();
  });

  socket.on('gameOver', stopLocalCountdown);
  socket.on('defaultWin', stopLocalCountdown);
  socket.on('opponentDisconnected', stopLocalCountdown);
});

onUnmounted(stopLocalCountdown);

defineExpose({ resetTimer });
</script>

<style scoped>
.timer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f5f5f5;
  margin-top: 20px;
  width: 601px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.player {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row-reverse;
  flex: 1;
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
