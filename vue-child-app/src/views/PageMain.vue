<style lang="stylus" scoped>
.root-main
  width 100%
  padding 20px
</style>

<template>
  <div class="root-main">
    <div class="title">Main page</div>
    <div class="info">Inside vue child component</div>
    <div class="info">Button "To main page" redirects to '/main' but only inside child component</div>

    <div><router-link :to="{name: 'left'}"><h3><u>Left</u></h3></router-link></div>
    <div><router-link :to="{name: 'right'}"><h3><u>Right</u></h3></router-link></div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

