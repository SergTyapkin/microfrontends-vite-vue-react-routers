import Vuex from 'vuex'

const Store = new Vuex.Store({
  state: {
    user: {
      id: String(),
      name: String(),
      group: String(),
      tg: String(),
      vk: String(),
      email: String(),
      phone: String(),
      isAdmin: Boolean(),

      isSignedIn: false,
    },
    task: {
      points: Number(),

      isGotten: false,
    },
    team: {
      id: String(),
      title: String(),
      points: Number(),

      isGotten: false,
    }
  },
  mutations: {
    SET_USER(state, userData) {
      state.user.id = String(userData.id);
      state.user.name = String(userData.name);
      state.user.group = String(userData.group);
      state.user.tg = String(userData.telegram);
      state.user.vk = String(userData.vk);
      state.user.email = String(userData.email);
      state.user.phone = String(userData.phone_number);
      state.user.isAdmin = Boolean(userData.is_admin);

      state.user.isSignedIn = true;
    },
    SET_TASK(state, taskData) {
      state.task.points = String(taskData.points);

      state.task.isGotten = true;
    },
    SET_TEAM(state, teamData) {
      state.team.id = String(teamData.id);
      state.team.name = String(teamData.name);
      state.team.points = Number(teamData.points);

      state.team.isGotten = true;
    },
    DELETE_USER(state) {
      state.user.isSignedIn = false;
    },
    DELETE_TASK(state) {
      state.task.isGotten = false;
    },
    DELETE_TEAM(state) {
      state.team.isGotten = false;
    },
  },
  actions: {
    async GET_USER(state) {
      const {data, code, ok} = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      state.commit('SET_USER', data);
    },
    SET_TASK(state, taskData) {
      state.commit('SET_TASK', taskData);
    },
    SET_TEAM(state, teamData) {
      state.commit('SET_TEAM', teamData);
    },
    DELETE_USER(state) {
      state.commit('DELETE_USER');
    },
    DELETE_TASK(state) {
      state.commit('DELETE_TASK');
    },
    DELETE_TEAM(state) {
      state.commit('DELETE_TEAM');
    },
  }
});

export default Store;
