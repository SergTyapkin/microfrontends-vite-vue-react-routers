<style lang="stylus" scoped>
header-height = 80px
header
  padding 0 40px
  line-height header-height
  height header-height
  position absolute
  top 0
  width 100%
  background black
  text-align center

.all-page-wrapper
  width 100%
  min-height 100vh

  > *
    padding 40px
    padding-top (header-height + 40px)
    position absolute
    width 100%
    min-height 100vh
</style>


<style>
@keyframes scale-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
@keyframes scale-in {
  0% {
    transform: scale(1.05);
    opacity: 0;
  }
  25% {
    transform: scale(1.05);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.scale-in-enter-active {
  overflow: hidden;
  animation: scale-in .2s ease;
}
.scale-in-leave-active {
  overflow: hidden;
  animation: scale-out .2s ease;
}

.opacity-enter-active {
  animation: opacity .3s;
}
.opacity-leave-active {
  animation: opacity .3s reverse forwards;
}
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <header><h1>Host app header</h1></header>

  <div class="all-page-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="scale-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>

  <Modals ref="modal"></Modals>
  <Popups ref="popups"></Popups>
</template>


<script lang="ts">
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";
import {RouteLocationNormalized} from "vue-router";
import API from "~/Api";


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

