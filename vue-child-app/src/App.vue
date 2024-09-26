<style lang="stylus" scoped>
.root-app
  background #000064
  color white
  width 100%
  text-align center
</style>

<template>
  <div class="root-app">
    <h1>Vue component</h1>
    <router-link :to="{name: 'main'}"><h3><u>To Main page</u></h3></router-link>

    <router-view></router-view>

    <Modals ref="modal"></Modals>
    <Popups ref="popups"></Popups>
  </div>
</template>


<script>
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";
import API from "./utils/api";


export default {
  components: {Modals, Popups},

  data() {
    return {
      api: new API(),
    }
  },

  async mounted() {
    // const global = getCurrentInstance().appContext.config.globalProperties;
    // // Прописываем в глобавльные свойства частоиспользуемые компоненты, чтобы они были доступны из любых других компонентов
    // global.$user = this.$store.state.user;
    // global.$modals = this.$refs.modal;
    // global.$popups = this.$refs.popups;
    // global.$app = this; // это обычно не используется, но может пригодиться
    // global.$api = new API();
    this.api.getTextTask();
  },

  watch: {
    $route(to, from) {
      console.log(from.path, '->', to.path);
    }
  },
};
</script>


