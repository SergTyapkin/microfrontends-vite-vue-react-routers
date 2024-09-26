<style lang="stylus" scoped>
.root-main
  width 100%
  padding 20px
</style>

<template>
  <div class="root-main">
    <div class="title">Основная страница</div>
    <div class="info">Внутри компонента sidebar</div>

    <div><router-link :to="{name: 'left'}"><h3><u>Left</u></h3></router-link></div>
    <div><router-link :to="{name: 'right'}"><h3><u>Right</u></h3></router-link></div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

