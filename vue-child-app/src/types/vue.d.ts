import App from "../App.vue";
import API from "../API.js";
import {ComponentCustomProperties, VueElement} from "vue";

declare module 'vue' {
  interface ComponentCustomProperties {
    $app: App,
    $api: API,
    $modals: VueElement,
    $popups: VueElement,
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface App extends ComponentCustomProperties {}

