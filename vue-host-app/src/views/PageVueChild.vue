<style scoped lang="stylus">
</style>

<template>
  <h3><u><router-link :to="{name: 'default'}">&lt; Back</router-link></u></h3>
  <div>Navigate child component from host component:</div>
  <h3><u><router-link to="/vue-child/main/left">Child To left</router-link></u></h3>
  <h3><u><router-link to="/vue-child/main/right">Child To Right</router-link></u></h3>

  <VueChild></VueChild>
</template>

<script>
import VueChild from "~/components/VueChild.vue";

export default {
  components: {VueChild}
}
</script>
