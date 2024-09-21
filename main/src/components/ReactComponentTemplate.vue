<template>
  <div></div>
</template>

<script>
import ReactDOM from "react-dom/client";

export default {
  props: {
    reactComponent: Function,
  },

  data() {
    return {
      rootReactElement: undefined,
    }
  },

  mounted() {
    this.rootReactElement = ReactDOM.createRoot(this.$el);
    const createdReactComponent = this.reactComponent();
    this.rootReactElement.render(createdReactComponent);
  },
  beforeUnmount() {
    this.rootReactElement.unmount();
  }
}
</script>
