<style lang="stylus" scoped>
</style>

<template>
  <div class="root-main">
    <div class="form">
      <div class="title">Navigation in host component</div>
      <h3><u><router-link :to="{name: 'reactChild'}">To ReactChild</router-link></u></h3>
      <h3><u><router-link :to="{name: 'vueChild'}">To VueChild</router-link></u></h3>
      <h3><u><router-link :to="{name: 'all'}">To All components</router-link></u></h3>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

