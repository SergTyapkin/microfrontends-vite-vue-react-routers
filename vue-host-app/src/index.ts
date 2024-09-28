import { createApp } from 'vue'

// @ts-ignore
import App from './App.vue';
import Storage from './Store.js';
import createVueRouter from './Router.js';

// глобальное подключение css файла с базовыми стилями
// import './styles/fontsLoader.styl';
import './styles/global.styl';
// Вообще обычно делать import не JS-ных файлов в js нельзя, но Vite это распознает так, как нужно.


const Router = createVueRouter(Storage);
const app = createApp(App)
    // .use(WS, `wss://${location.host}/ws`)  // Пока что без вебсокетов
    .use(Router)
    .use(Storage)
    .mount('#app');
Storage.$app = app;