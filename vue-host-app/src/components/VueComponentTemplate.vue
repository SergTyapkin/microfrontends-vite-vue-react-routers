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
      onNavigate: () => {},
      unmount: () => {},

      iswatch: true,
    }
  },

  async mounted() {
    const importedModule = await this.vueImportPromise;
    const vueComponentMount = importedModule.default;
    vueComponentMount(this.$el);


    // this.initialPath = this.$route.matched[0].path;
    // const {onParentNavigate, unmount} = reactComponentMount(this.$el, {
    //   initialPath: this.initialPath,
    //   onNavigate: ({ pathname: nextPathname }) => {
    //     let nextFullPath = this.initialPath + nextPathname;
    //     console.log("route from auth to container", nextFullPath, this.$route.path);
    //     if (this.$route.path !== nextFullPath) {
    //       this.iswatch = false;
    //       this.$router.push(nextFullPath);
    //     }
    //   },
    //   // onSomethingCustomEvent: () => {},
    // });
    // this.onNavigate = onParentNavigate;
    // this.unmount = unmount;
  },

  methods: {
    getInnerRoute(path) {
      return path.split(this.initialPath)[1];
    },
  },

  watch: {
    // $route(to, from) {
    //   let innerRoute = this.getInnerRoute(to.path);
    //   console.log(
    //     "watch",
    //     this.getInnerRoute(to.path),
    //     this.getInnerRoute(from.path),
    //     this.iswatch
    //   );
    //   if (this.iswatch) {
    //     if (innerRoute) {
    //       // this.onParentNavigate(innerRoute);
    //     } else {
    //       return true;
    //     }
    //   } else this.iswatch = true;
    // },
  },
}
</script>
