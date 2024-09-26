<template>
  <VueChild></VueChild>
</template>

<script>
import {defineAsyncComponent} from "vue";
const VueChild = defineAsyncComponent(() => import("vueChildApp/App"));

export default {
  components: {VueChild}
};
</script>
