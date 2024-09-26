<style scoped lang="stylus">
</style>

<template>
  <h3><u><router-link :to="{name: 'default'}">&lt; На главную</router-link></u></h3>

  <VueChild></VueChild>
</template>

<script>
import VueChild from "~/components/VueChild.vue";

export default {
  components: {VueChild}
}
</script>
