import { createApp } from 'vue'

import App from './App.vue'
// import Storage from './Store.js'
import createVueRouter from './Router.js'

export default function mount(el: HTMLElement, {onNavigate, initialPath}: {
  onNavigate: (pathname: string) => void,
  initialPath?: string
} = {onNavigate: () => {}}) {
  const Router = createVueRouter(Storage, initialPath, onNavigate);
  const app = createApp(App);
  app
    // .use(WS, `wss://${location.host}/ws`)  // Пока что без вебсокетов
    .use(Router)
    // .use(Storage)
    .mount(el);
  // Storage.$app = app;

  return {
    onParentNavigate: (nextPath: string) => {
      const path = Router.currentRoute.value.path;
      if (path !== nextPath) {
        Router.push(nextPath);
      }
    },
    unmount: () => {
      app.unmount();
    }
  };
}

