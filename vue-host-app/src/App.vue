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


<script>
import {getCurrentInstance} from "vue";
import {Modals, Popups} from "@sergtyapkin/modals-popups";


export default {
  components: {Modals, Popups},

  data() {
    return {
      onNavigate: undefined,
    }
  },

  mounted() {
    const global = getCurrentInstance().appContext.config.globalProperties;

    // Прописываем в глобальные свойства частоиспользуемые переменные, чтобы они были доступны из любых других компонентов
    global.$user = this.$store.state.user;
    global.$modals = this.$refs.modal;
    global.$popups = this.$refs.popups;
    global.$app = this; // это обычно не используется, но может пригодиться

    // console.log("IMPORT:", mountHeader);
    //
    // const { onParentNavigate } = mountHeader(this.$refs.reactHeader);
    // this.onNavigate = onParentNavigate;
  },

  watch: {
    $route(to, from) {
      console.log("Host router:", from.path, '->', to.path);
    }
  },
};
</script>

