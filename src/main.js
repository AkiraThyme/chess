// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import { createVuetify } from 'vuetify';


import 'vuetify/styles'
import './style.css'
import './theme.css'
import './base.css';
import './desktop.css'
import 'vuetify/dist/vuetify.min.css'; // Make sure to import the Vuetify CSS


import ChessBoard from './components/board/ChessBoard.vue';
import BoardTimer from './components/util/BoardTimer.vue';


const vuetify = createVuetify();
const app = createApp(App);


app.component('ChessBoard', ChessBoard);
app.component('BoardTimer', BoardTimer);
app.use(vuetify);
app.use(createPinia());
app.mount('#app');
