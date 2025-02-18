<template>
  <div class="pgn-history-container">
    <!-- Game Result Display -->
    <div v-if="gameResult" class="game-result">
      {{ gameResult }}
    </div>

    <h1 class="title">Move History</h1>

    <!-- Move History List -->
    <div class="history-card">
      <ul class="history-list">
        <li
          v-for="(move, index) in history"
          :key="index"
          @click="moveToHistory(index)"
          :class="{ 'item-select': select === index }"
        >
          <span class="move-item">
            <label v-if="index % 2 === 0">{{ Math.floor(index / 2) + 1 }}.</label>
            <img :src="urlPiece(move)" alt="piece" class="piece-icon" />
            <label>{{ move.san }}</label>
          </span>
        </li>
        <li v-if="history.length === 0" class="empty-message">No moves yet.</li>
      </ul>
    </div>

    <!-- Playback Controls -->
    <div v-show="!active" class="controls">
      <v-btn class="btn" @click="moveToHistory(select - 1)">
        <<</v-btn>
      <v-btn class="btn" @click="play">
        {{ played ? '||' : '>' }}
      </v-btn>
      <v-btn class="btn" @click="moveToHistory(select + 1)">
        >></v-btn>
      <span class="speed-label">{{ velo }}</span>
      <input v-model="velo" type="range" min="0" max="5" step="1" class="speed-slider" />
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../../store/store';
import { computed } from 'vue';

let playEvent = null;

export default {
  name: 'PgnHistory',
  props: {
    history: {
      type: Array,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    humanvspc: {
      type: Function,
      default: () => false,
    },
  },
  setup() {
    const gameStore = useGameStore();
    const gameResult = computed(() => {
      if (gameStore.board.wins === 'white') return `Winner: ${gameStore.whitePlayer}`;
      if (gameStore.board.wins === 'black') return `Winner: ${gameStore.blackPlayer}`;
      if (gameStore.board.wins === 'draw') return 'Draw';
      return '';
    });
    return { gameResult };
  },
  data() {
    return {
      velo: 2,
      select: -1,
      played: false,
    };
  },
  methods: {
    urlPiece(move) {
      if (!move || !move.piece || !move.color) return '';
      return new URL(`../../assets/images/pieces/merida/${move.color}${move.piece.toUpperCase()}.svg`, import.meta.url).href;
    },
    moveToHistory(index) {
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
    play() {
      this.played = !this.played;
      if (this.played) {
        playEvent = setInterval(() => {
          this.moveToHistory(this.select + 1);
        }, parseInt(this.velo) * 1000);
      } else {
        clearInterval(playEvent);
      }
    },
  },
  watch: {
    velo() {
      if (this.played) {
        clearInterval(playEvent);
        this.play();
      }
    },
  },
};
</script>

<style scoped>
.pgn-history-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
}

.history-card {
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}

.history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.move-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.piece-icon {
  height: 20px;
  width: 20px;
}

.item-select {
  background-color: #e0f2f1;
  border-radius: 8px;
}

.empty-message {
  text-align: center;
  font-style: italic;
  color: #999;
  margin-top: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  background-color: #1B5E20;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.speed-label {
  margin-left: 0.5rem;
}

.speed-slider {
  flex-grow: 1;
  max-width: 100px;
}

</style>
