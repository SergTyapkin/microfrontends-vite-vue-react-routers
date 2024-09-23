<template>
  <ReactComponentTemplate
    :react-import-promise="import('header/App')"
    :element-props="{caption: 'My caption text'}"
  />
</template>

<script>
import ReactComponentTemplate from "./ReactComponentTemplate.vue";

export default {
  components: {ReactComponentTemplate},
}
</script>
