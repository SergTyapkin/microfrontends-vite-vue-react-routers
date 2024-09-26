<style lang="stylus" scoped>
.root-404
  width 100%
  padding 20px
  .form
    margin 20px auto
    max-width 600px
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    text-align center
    color colorText1
    .title
      font-large()
      margin-bottom 10px
    .info
      font-medium()
      margin-bottom 15px
</style>

<template>
  <div class="root-404">
    <div class="form">
      <div class="title">404 url not found</div>
      <div class="info">This page doesn't exists</div>
      <router-link :to="{name: 'default'}" class="link">To main page</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

