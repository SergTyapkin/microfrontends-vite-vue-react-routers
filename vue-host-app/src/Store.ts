// @ts-ignore
import Vuex from 'vuex';
import {type User, type State, Store} from "./types/vuex.js";

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    SET_USER(state: State, userData: User) {
      state.user.id = Number(userData.id);

      state.user.isSignedIn = true;
    },
    DELETE_USER(state: State) {
      state.user = {
        isSignedIn: false,
      }
    },
  },
  actions: {
    async GET_USER(this: Store, state: State) {
      const {data, ok}: {data: any, ok: boolean} = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      state.commit('SET_USER', data);
    },
    DELETE_USER(state: State) {
      state.commit('DELETE_USER');
    },
  }
});
