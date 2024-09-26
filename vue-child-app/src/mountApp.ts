import { createApp } from 'vue'

import App from './App.vue'
// import Storage from './Store.js'
import createVueRouter from './Router.js'


export default function mount(el: string | Element) {
  const Router = createVueRouter(Storage);
  const app = createApp(App)
    // .use(WS, `wss://${location.host}/ws`)  // Пока что без вебсокетов
    .use(Router)
    // .use(Storage)
    .mount(el);
  // Storage.$app = app;
}
