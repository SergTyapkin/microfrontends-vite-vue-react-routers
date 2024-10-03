import { createApp } from 'vue'
import { type Router } from 'vue-router'

// @ts-ignore
import App from './App.vue'
import createVueRouter from './Router.js'

export default function mount(el: HTMLElement, options?: {
  onNavigate: (pathname: string) => void,
  initialPath: string
}, props: any = {}) {
  let Router: Router;
  if (!options) {
    Router = createVueRouter(Storage, '', () => {}, true);
  } else {
    const onNavigate = options.onNavigate ?? (() => {});
    const initialPath = options.initialPath ?? '';
    Router = createVueRouter(Storage, initialPath, onNavigate, false);
  }
  const app = createApp(App, props);
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

