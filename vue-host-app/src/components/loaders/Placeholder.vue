<style lang="stylus" scoped>
@import "../../../../shared-res/styles/animations.styl"
@import "../../../../shared-res/styles/utils.styl"
@import "../../../../shared-res/styles/constants.styl"

.root-placeholder
  height var(--height)
  width var(--width)
  border-radius borderRadiusM
  c1 = mix(white, transparent, 5%)
  c2 = mix(white, transparent, 15%)
  background linear-gradient(60deg, c1 0, c1 40%, c2 50%, c1 60%, c1 100%)
  background-size 400% 100%
  position relative
  &:not(.error)
    animation-not-reduced(move-background infinite 2s linear)
    @keyframes move-background
      from
        background-position-x 0
      to
        background-position-x 125%
  .loading-symbol
    centered-absolute-transform()
</style>

<template>
  <div class="root-placeholder" :class="{error}" :style="{'--height': height, '--width': width}">
    <transition name="opacity">
      <CircleLoading v-if="showLoadingSymbol && !error" class="loading-symbol" light></CircleLoading>
    </transition>
    <transition name="opacity">
      <div v-if="error" class="loading-symbol">Unable to load component</div>
    </transition>
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
    showLoadingSymbol: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
