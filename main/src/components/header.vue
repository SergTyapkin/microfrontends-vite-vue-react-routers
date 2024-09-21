<template>
  <ReactComponentTemplate :react-component="ReactHeader"/>
</template>

<script>
import ReactHeader from "header/App";
import ReactComponentTemplate from "./ReactComponentTemplate.vue";

export default {
  components: {ReactComponentTemplate},

  data() {
    return {
      ReactHeader,
    }
  }
}
</script>
