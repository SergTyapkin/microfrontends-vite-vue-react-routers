<template>
  <div></div>
</template>

<script>
export default {
  props: {
    reactImportPromise: Promise,
    elementProps: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      navigateReactElement: () => {},
      unmount: () => {},

      initialPath: this.$route.matched[0].path,

      skip1watch: false,

      isComponentLoaded: false,
    }
  },

  async mounted() {
    const importedModule = await this.reactImportPromise;
    const reactComponentMount = importedModule.mount;

    const {onParentNavigate, unmount} = reactComponentMount(this.$el, {
      initialPath: this.initialPath,
      onNavigate: ({ pathname: nextPathname }) => {
        let nextFullPath = this.initialPath + nextPathname;
        if (this.$route.path !== nextFullPath) {
          this.skip1watch = true;
          this.$router.push(nextFullPath);
        }
      },
    });
    this.navigateReactElement = onParentNavigate;
    this.unmount = unmount;

    this.isComponentLoaded = true;
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
