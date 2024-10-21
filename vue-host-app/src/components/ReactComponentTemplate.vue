<template>
  <div>
    <Placeholder :width="placeholderWidth" :height="placeholderHeight" show-loading-symbol :error="isLoadingError"></Placeholder>
  </div>
</template>

<script>
import Placeholder from "~/components/loaders/Placeholder.vue";

export default {
  components: {Placeholder},

  props: {
    reactImportPromise: {
      type: Promise,
      required: true,
    },
    elementProps: {
      type: Object,
      default: {},
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
      navigateReactElement: () => {},
      unmount: () => {},

      initialPath: this.$route.matched[0].path,

      skip1watch: false,

      isLoadingError: false,
    }
  },

  async mounted() {
    let importedModule;
    try {
      importedModule = await this.reactImportPromise;
    } catch (e) {
      this.isLoadingError = true;
      return;
    }
    const reactComponentMount = importedModule.mount;

    const {onParentNavigate, unmount} = reactComponentMount(this.$el, {
      initialPath: this.initialPath,
      onNavigate: ({ pathname: nextPathname }) => {
        if (!nextPathname) {
          return;
        }
        let nextFullPath = this.initialPath + nextPathname;
        if (this.$route.path !== nextFullPath) {
          this.skip1watch = true;
          this.$router.push(nextFullPath);
        }
      },
    }, this.elementProps);
    this.navigateReactElement = onParentNavigate;
    this.unmount = unmount;
  },

  methods: {
    getInnerRoute(path) {
      return path.split(this.initialPath)[1];
    },
  },

  watch: {
    $route(to, from) {
      if (this.skip1watch) {
        this.skip1watch = false;
        return;
      }
      const innerRoute = this.getInnerRoute(to.path);
      if (innerRoute) {
        this.navigateReactElement(innerRoute);
      }
    },
  },

  beforeUnmount() {
    this.unmount();
  }
}
</script>
