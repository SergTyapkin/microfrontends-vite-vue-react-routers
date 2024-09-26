<style lang="stylus" scoped>
.root-app
  background #000064
  color white
  width 100%
  text-align center
  .logo
    size = 100px
    moving-down-size = size / 3

    width size
    height size
    will-change filter
    transition filter 300ms
    display block
    margin 0 auto
    margin-bottom moving-down-size
    &:hover
      filter 'drop-shadow(0 0 %s #5dffacaa)' % (size / 10)

    @keyframes logo-move
      from
        transform translateY(moving-down-size) scale(0.8)
      to
        transform translateY(0) scale(1)

    @media (prefers-reduced-motion: no-preference)
      animation logo-move infinite 2s ease alternate
</style>

<template>
  <div class="root-app">
    <h1>Vue component</h1>
    <img class="logo" src="/res/vue.svg" alt="vue logo">
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
      console.log("Vue child router:", from.path, '->', to.path);
    }
  },
};
</script>


