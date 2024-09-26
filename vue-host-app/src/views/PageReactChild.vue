<style scoped lang="stylus">
</style>

<template>
  <h3><u><router-link :to="{name: 'default'}">&lt; На главную</router-link></u></h3>

  <ReactChild></ReactChild>
</template>

<script>
import ReactChild from "~/components/ReactChild.vue";

export default {
  components: {ReactChild}
}
</script>
