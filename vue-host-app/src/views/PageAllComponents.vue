<style lang="stylus" scoped>
</style>

<template>
  <div class="root-main">
    <h3><u><router-link :to="{name: 'default'}">&lt; Back</router-link></u></h3>
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

