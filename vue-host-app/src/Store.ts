import Vuex from 'vuex';
import { type State, type Store } from '~/types/store';

export default new Vuex.Store({
  state: {
    user: {},
    workspace: {},
  },
  mutations: {
    SET_USER(state: State, userData: User) {
      state.user.id = String(userData.id);
      state.user.username = String(userData.username);
      state.user.email = String(userData.email);

      state.user.isSignedIn = true;
    },
    DELETE_USER(state: State) {
      state.user.isSignedIn = false;
    },
  },
  actions: {
    async GET_USER(this: Store, state: State) {
      const { data, ok }: { data: any; ok: boolean } = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      state.commit('SET_USER', data);
    },
    DELETE_USER(state: State) {
      state.commit('DELETE_USER');
    },
  },
});
