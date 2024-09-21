<template>
  <Sidebar></Sidebar>
</template>

<script>
import {defineAsyncComponent} from "vue";
const Sidebar = defineAsyncComponent(() => import("sidebar/App"));
// import Sidebar from "sidebar/App";

export default {
  components: {Sidebar}
};
</script>
