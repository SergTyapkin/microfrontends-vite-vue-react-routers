<template>
  <div>
    <Placeholder :width="placeholderWidth" :height="placeholderHeight" show-loading-symbol :error="isLoadingError" />
  </div>
</template>

<script>
import Placeholder from "~/components/loaders/Placeholder.vue";

export default {
  components: {Placeholder},

  props: {
    vueImportPromise: {
      type: Promise,
      required: true,
    },
    elementProps: {
      type: Object,
      default: () => ({}),
    },
    placeholderHeight: {
      type: String,
      default: "500px",
    },
    placeholderWidth: {
      type: String,
      default: "100%",
    }
  },

  data() {
    return {
      navigateVueElement: () => {},
      unmount: () => {},

      initialPath: this.$route.matched[0].path,

      skip1watch: false,
      isLoadingError: false,
    }
  },

  async mounted() {
    let importedModule;
    try {
      importedModule = await this.vueImportPromise;
    } catch {
      this.isLoadingError = true;
      return;
    }
    const vueComponentMount = importedModule.default;

    const {onParentNavigate, unmount} = vueComponentMount(this.$el, {
      initialPath: this.initialPath,
      onNavigate: (nextPathname) => {
        if (!nextPathname) {
          return;
        }
        let nextFullPath = this.initialPath + nextPathname;
        if (this.$route.path.replace(/\/$/, "") !== nextFullPath.replace(/\/$/, "")) { // Compare with replacing trailing slashes
          this.skip1watch = true;
          this.$router.push(nextFullPath);
        }
      },
    }, this.elementProps);
    this.navigateVueElement = onParentNavigate;
    this.unmount = unmount;
  },
  unmounted() {
    this.unmount();
  },

  beforeUnmount() {
    this.unmount();
  },

  methods: {
    getInnerRoute(path) {
      return path.split(this.initialPath)[1];
    },
  },

  watch: {
    $route(to) {
      if (this.skip1watch) {
        this.skip1watch = false;
        return;
      }
      const innerRoute = this.getInnerRoute(to.path);
      if (innerRoute) {
        this.navigateVueElement(innerRoute);
      }
    },
  }
}
</script>
