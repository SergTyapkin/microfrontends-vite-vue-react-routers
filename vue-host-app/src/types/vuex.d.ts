import {Store as VuexStore} from "vuex";
import {ComponentCustomProperties} from "vue";
import App from "../App.vue";

interface User {
  id?: number

  isSignedIn: boolean
}

// declare my own store state
interface State {
  user: User
  commit: (event: string, data?: any) => void
}

interface Store extends VuexStore<any> {
  $app: App
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store
    $user: User
  }
}

interface App extends ComponentCustomProperties {}

declare module 'vuex' {
  interface Store extends Store {}
}
