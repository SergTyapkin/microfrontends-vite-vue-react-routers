<style lang="stylus" scoped>
@require "../../../../shared-res/styles/animations.styl"
@require "../../../../shared-res/styles/utils.styl"
@require "../../../../shared-res/styles/constants.styl"

.root-placeholder
  height var(--height)
  width var(--width)
  border-radius borderRadiusM
  c1 = mix(white, transparent, 5%)
  c2 = mix(white, transparent, 15%)
  background linear-gradient(60deg, c1 0, c1 40%, c2 50%, c1 60%, c1 100%)
  background-size 400% 100%
  position relative
  animation-not-reduced(move-background infinite 2s linear)
  @keyframes move-background
    from
      background-position-x 0
    to
      background-position-x 125%
  .loading
    centered-absolute-transform()
</style>

<template>
  <div class="root-placeholder" :style="{'--height': height, '--width': width}">
    <CircleLoading v-if="showLoadingSign" class="loading" light></CircleLoading>
  </div>
</template>

<script>
import CircleLoading from "~/components/loaders/CircleLoading.vue";

export default {
  components: {CircleLoading},
  props: {
    height: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    showLoadingSign: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
