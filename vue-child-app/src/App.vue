<style lang="stylus" scoped>
@require "./styles/constantsVue.styl"
@require "../../shared-res/styles/components.styl"
@require "../../shared-res/styles/animations.styl"

.root-app
  block(colorVue)
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
      filter 'drop-shadow(0 0 %s %s)' % ((size / 10) colorVue)

    animation-not-reduced(logo-move infinite 2s ease alternate)
    @keyframes logo-move
      from
        transform translateY(moving-down-size) scale(0.8)
      to
        transform translateY(0) scale(1)
</style>

<template>
  <div class="root-app">
    <h1>Vue component</h1>
    <img class="logo" src="/res/vue.svg" alt="vue logo">
    <div>Prop "caption" value: {{ caption }}</div>
    <router-link :to="{name: 'main'}"><h3><u>To Main page</u></h3></router-link>

    <router-view></router-view>

    <Modals ref="modal"></Modals>
    <Popups ref="popups"></Popups>
  </div>
</template>


<script lang="ts">
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";
import {RouteLocationNormalized} from "vue-router";
import API from "~/API";


export default {
  components: {Modals, Popups},

  props: {
    caption: {
      type: String,
      default: "default text"
    },
  },

  data() {
    return {
    }
  },

  async mounted() {
    const global = getCurrentInstance()?.appContext.config.globalProperties;
    if (global) {
      // Прописываем в глобавльные свойства частоиспользуемые компоненты, чтобы они были доступны из любых других компонентов
      global.$modals = this.$refs.modal;
      global.$popups = this.$refs.popups;
      global.$app = this; // это обычно не используется, но может пригодиться
      global.$api = new API();
    }
  },

  watch: {
    $route(to: RouteLocationNormalized, from: RouteLocationNormalized) {
      console.log("Vue child router:", from.path, '->', to.path);
    }
  },
};
</script>


