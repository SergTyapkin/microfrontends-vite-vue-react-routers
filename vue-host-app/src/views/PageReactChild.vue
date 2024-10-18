<style scoped lang="stylus">
</style>

<template>
  <div>
    <h3><u><router-link :to="{name: 'default'}">&lt; Back</router-link></u></h3>

    <ReactChild></ReactChild>
  </div>
</template>

<script>
import ReactChild from "~/components/ReactChild.vue";

export default {
  components: {ReactChild}
}
</script>
