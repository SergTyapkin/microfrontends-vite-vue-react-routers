<template>
  <ReactComponentTemplate
    :react-import-promise="import('reactChildApp/App')"
    :element-props="{caption: 'Custom text from host app'}"
  />
</template>

<script>
import ReactComponentTemplate from "./ReactComponentTemplate.vue";

export default {
  components: {ReactComponentTemplate},
}
</script>
