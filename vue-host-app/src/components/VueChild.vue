<template>
  <VueComponentTemplate
    :vue-import-promise="import('vueChildApp/App')"
    :element-props="{caption: 'Custom text from host app'}"
  ></VueComponentTemplate>
</template>

<script>
import VueComponentTemplate from "~/components/VueComponentTemplate.vue";

export default {
  components: {VueComponentTemplate},
};
</script>
