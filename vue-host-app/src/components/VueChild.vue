<template>
  <VueComponentTemplate
    :vue-import-promise="import('vueChildApp/App')"
    :element-props="{}"
  ></VueComponentTemplate>
</template>

<script>
import VueComponentTemplate from "~/components/VueComponentTemplate.vue";

export default {
  components: {VueComponentTemplate},
};
</script>
