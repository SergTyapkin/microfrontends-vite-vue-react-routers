<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

</style>

<template>
  <div class="root-main">
    <router-link :to="{name: 'default'}">&lt; Back</router-link>
    <div class="title">All child components:</div>

    <ReactChild></ReactChild>
    <VueChild></VueChild>
  </div>
</template>

<script>
import VueChild from "~/components/VueChild.vue";
import ReactChild from "~/components/ReactChild.vue";

export default {
  components: {ReactChild, VueChild}
}
</script>

