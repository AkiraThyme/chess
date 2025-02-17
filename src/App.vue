<script setup>
import ChessBoard from './components/board/ChessBoard.vue';
import './theme.css';
import 'vuetify/dist/vuetify.min.css'; // Make sure to import the Vuetify CSS
import 'vuetify/styles'


</script>

<template>
  <ChessBoard theme="marble"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
