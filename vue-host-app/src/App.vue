<style lang="stylus" scoped>
header
  padding 20px 40px
  width 100%
  background black
  text-align center

.all-page-wrapper
  padding 40px
</style>

<template>
  <header><h1>Host app header</h1></header>

  <div class="all-page-wrapper">
<!--      <router-view v-slot="{ Component }">-->
<!--        <transition name="scale-in" duration="200">-->
<!--          <component :is="Component"/>-->
<!--        </transition>-->
<!--      </router-view>-->
    <router-view></router-view>
  </div>

  <Modals ref="modal"></Modals>
  <Popups ref="popups"></Popups>
</template>


<script lang="ts">
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";
import {RouteLocationNormalized} from "vue-router";
import API from "~/Api.js";


export default {
  components: {Modals, Popups},

  data() {
    return {
    }
  },

  mounted() {
    const global = getCurrentInstance()?.appContext.config.globalProperties;

    if (global) {
      // Прописываем в глобальные свойства частоиспользуемые переменные, чтобы они были доступны из любых других компонентов
      global.$modals = this.$refs.modal;
      global.$popups = this.$refs.popups;
      global.$app = this; // это обычно не используется, но может пригодиться
      global.$api = new API(); // это обычно не используется, но может пригодиться
    }
  },

  watch: {
    $route(to: RouteLocationNormalized, from: RouteLocationNormalized) {
      console.log("Host router:", from.path, '->', to.path);
    }
  },
};
</script>

