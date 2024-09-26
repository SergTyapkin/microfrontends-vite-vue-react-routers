<template>
  <div></div>
</template>

<script>
export default {
  props: {
    vueImportPromise: Promise,
    elementProps: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      navigateVueElement: () => {},
      unmount: () => {},

      initialPath: this.$route.matched[0].path,

      skip1watch: false,
    }
  },

  async mounted() {
    const importedModule = await this.vueImportPromise;
    const vueComponentMount = importedModule.default;

    const {onParentNavigate, unmount} = vueComponentMount(this.$el, {
      initialPath: this.initialPath,
      onNavigate: (nextPathname) => {
        let nextFullPath = this.initialPath + nextPathname;
        if (this.$route.path.replace(/\/$/, "") !== nextFullPath.replace(/\/$/, "")) { // Compare with replacing trailing slashes
          this.skip1watch = true;
          this.$router.push(nextFullPath);
        }
      },
    });
    this.navigateVueElement = onParentNavigate;
    this.unmount = unmount;
  },
  unmounted() {
    this.unmount();
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
        this.navigateVueElement(innerRoute);
      }
    },
  },
}
</script>
