import App from "~/App.vue";
import API from "~/Api";
import {VueElement} from "vue";

declare module 'vue' {
  interface ComponentCustomProperties {
    $app: App,
    $api: API,
    $modals: VueElement,
    $popups: VueElement,
  }
}
