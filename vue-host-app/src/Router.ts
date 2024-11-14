import {createRouter, createWebHistory, Router, RouteLocationNormalized, NavigationGuardNext} from 'vue-router'

import { type Store } from '~/types/store';

// Components:
import Page404 from "~/views/Page404.vue";
import PageNavigation from "~/views/PageNavigation.vue";
import PageAllComponents from "~/views/PageAllComponents.vue";
import PageVueChild from "~/views/PageVueChild.vue";
import PageReactChild from "~/views/PageReactChild.vue";


export default function createVueRouter(Store: Store): Router {
  Store;

  const routes = [
    {path: '/', name: 'default', component: PageNavigation},

    {path: '/all', name: 'all', component: PageAllComponents},
    {path: '/vue-child', name: 'vueChild', component: PageVueChild, children: [{path: ':pathMatch(.*)*', component: PageVueChild}]},
    {path: '/react-child', name: 'reactChild', component: PageReactChild, children: [{path: ':pathMatch(.*)*', component: PageReactChild}]},

    {path: '/:pathMatch(.*)*', name: 'page404', component: Page404},
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });


  // let router_got_user = false;
  Router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    to;
    from;
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
