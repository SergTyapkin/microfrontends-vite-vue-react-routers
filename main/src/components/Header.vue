<template>
  <ReactComponentTemplate :react-import-promise="ReactHeaderPromise"/>
</template>

<script>
import ReactComponentTemplate from "./ReactComponentTemplate.vue";

// import {lazy} from "react";
// const ReactHeader = await lazy(() => import("header/App"));
const ReactHeaderPromise = import("header/App");

export default {
  components: {ReactComponentTemplate},

  data() {
    return {
      ReactHeaderPromise,
    }
  }
}
</script>
