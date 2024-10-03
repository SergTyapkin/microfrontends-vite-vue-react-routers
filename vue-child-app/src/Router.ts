import {createRouter, createWebHistory, createMemoryHistory, Router, RouteLocationNormalized, NavigationGuardNext} from 'vue-router'

// @ts-ignore
import {type Store} from 'vuex'

// Components:
// @ts-ignore
import Page404 from "~/views/Page404.vue";
// @ts-ignore
import PageMain from "~/views/PageMain.vue";
// @ts-ignore
import Left from "~/components/Left.vue";
// @ts-ignore
import Right from "~/components/Right.vue";


export default function createVueRouter(Store: Store, initialPath: string, beforeEach: (path: string) => void, isItHostApp: boolean): Router {
  Store;

  const routes = [
    {path: '/', name: 'default', component: null},

    {path: '/main', name: 'main', component: PageMain, children: [
        {path: '/main/left', name: 'left', component: Left},
        {path: '/main/right', name: 'right', component: Right},
      ]
    },

    {path: '/:pathMatch(.*)*', name: 'page404', component: Page404},
  ];

  const Router = createRouter({
    history: isItHostApp ? createWebHistory(initialPath) : createMemoryHistory(initialPath),
    routes: routes,
  });


  // let router_got_user = false;
  Router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    to;
    from;
    beforeEach(to.path);

    // if (!router_got_user) {
    //   await Store.dispatch('GET_USER');
    //   router_got_user = true;
    // }
    //
    // const notLoginedRedirect = {
    //   name: 'login'
    // }
    // const loginedRedirect = {
    //   name: 'profile',
    // }
    //
    // if (to.path === '/' || to.path === '') {
    //   if (Store.state.user.isSignedIn) {
    //     next(loginedRedirect);
    //     return;
    //   }
    //   next(notLoginedRedirect);
    //   return;
    // }
    //
    // // Login required redirects
    // if (to.matched.some(record => record.meta.loginRequired === true || record.meta.adminRequired === true)) {
    //   if (Store.state.user.isSignedIn) {
    //     next();
    //     return;
    //   }
    //   next(notLoginedRedirect);
    //   return;
    // } else if (to.matched.some(record => record.meta.noLoginRequired === true)) {
    //   if (!Store.state.user.isSignedIn) {
    //     next();
    //     return;
    //   }
    //   next(loginedRedirect);
    //   return;
    // }
    // if (to.matched.some(record => record.meta.adminRequired === true)) {
    //   if (Store.state.user.isAdmin) {
    //     next();
    //     return;
    //   }
    //   next(loginedRedirect);
    //   return;
    // }
    next();
  });

  Router.beforeResolve(async () => {
    if (window?.onbeforeunload) {
      if (confirm("Изменения не сохранены. Вы уверены, что хотите покинуть страницу?")) {
        window.onbeforeunload = null;
      } else {
        return false;
      }
    }
  });

  return Router;
}
