import axios from 'axios';

const userProfile = {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  getters: {
  },
  actions: {
    async searchUser({ state, commit }, forceSearch = false) {
      if (Object.keys(state.user).length <= 0 || forceSearch) {
        commit('SET_USER', {});

        try {
          const { data } = await axios.get('/users/me');

          commit('SET_USER', data);
        } catch (error) {
          console.error('Failed to get user info', error);
        }
      }
    },
  },
};

export default userProfile;
