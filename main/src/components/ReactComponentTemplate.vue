<template>
  <div></div>
</template>

<script>
import ReactDOM from "react-dom/client";

export default {
  props: {
    reactImportPromise: Promise,
  },

  data() {
    return {
      rootReactElement: undefined,
    }
  },

  async mounted() {
    const reactComponent = (await this.reactImportPromise).default;

    this.rootReactElement = ReactDOM.createRoot(this.$el);
    const createdReactComponent = reactComponent();
    this.rootReactElement.render(createdReactComponent);
  },

  beforeUnmount() {
    this.rootReactElement.unmount();
  }
}
</script>
