<template>
  <ReactComponentTemplate :react-component="ReactHeader"/>
</template>

<script>
import ReactComponentTemplate from "./ReactComponentTemplate.vue";

// import {lazy} from "react";
// const ReactHeader = await lazy(() => import("header/App"));
const ReactHeader = (await import("header/App")).default;

export default {
  components: {ReactComponentTemplate},

  data() {
    return {
      ReactHeader,
    }
  },
}
</script>
