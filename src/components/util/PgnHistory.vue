<template>
  <div>
    <!-- Game Result Display -->
    <div v-if="gameResult" class="game-result">
      {{ gameResult }}
    </div>

    <h1>Move History</h1>
    <!-- Move History -->
    <ul class="history-board" style="height: 50vh; overflow: auto;">
      <li v-for="(move, index) in history" :key="index" @click="moveToHistory(index)" style="padding: 0 !important" :class="{ 'item-select': select === index }">
        <span>
          <label v-if="index % 2 === 0">{{ (index / 2) + 1 }}.</label>
          <img type="image/svg+xml" alt="" :src="urlPiece(move)" height="25" width="25">
          <label>{{ move.from }} &gt; {{ move.to }} {{ move.san }}</label>
        </span>
      </li>
    </ul>

    <!-- Controls -->
    <div v-show="!active">
      <v-btn class="waves-effect waves-light btn" @click="moveToHistory(select - 1)">
        <<</v-btn>
      <v-btn class="waves-effect waves-light btn" @click="play">
        {{ played ? '||' : '>' }}
      </v-btn>
      <v-btn class="waves-effect waves-light btn" @click="moveToHistory(select + 1)">
        >></v-btn>
      <label>{{ velo }}</label>
      <input v-model="velo" type="range" min="0" max="5" step="1">
    </div>
  </div>
</template>

<script>
import { useGameStore } from '../../store/store';
import { computed } from 'vue';

let playEvent = 1;

export default {
  name: 'PgnHistory',
  props: {
    history: {
      type: Array,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    humanvspc: {
      type: Function,
      required: false,
      default: () => false
    }
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
      velo: 2, // speed of move playback
      select: -1, // selected move in the history
      played: false // play status
    };
  },
  methods: {
    urlPiece(move) {
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
    }
  },
  watch: {
    velo(newVal) {
      clearInterval(playEvent);
      this.played = false;
      this.play();
    }
  }
};
</script>

<style scoped>
.game-result {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4caf50;
}

.waves-effect {
    position: relative;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    vertical-align: middle;
    z-index: 1;
    will-change: opacity, transform;
    transition: all .3s ease-out;
}

.btn{
  text-decoration: none;
  color: #fff;
  background-color: #1B5E20;
  text-align: center;
  letter-spacing: .5px;
  transition: .2s ease-out;
  cursor: pointer;
}

.btn, .btn-large, .btn-flat {
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    outline: 0;
    padding: 0 2rem;
    text-transform: uppercase;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
}

ul.history-board li:hover {
  background-color: #b9d4cb;
}

.item-select {
  background-color: #5f6b44;
}
</style>
