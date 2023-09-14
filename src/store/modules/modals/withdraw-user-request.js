const withdrawUserRequest = {
  namespaced: true,
  state: {
    idRequest: 0,
  },
  mutations: {
    SET_ID_REQUEST(state, payload) {
      state.idRequest = payload;
    },
  },
  actions: {
    openModal({ commit, dispatch }, idRequest = 0) {
      dispatch('modalsController/show', 'WithdrawUserRequestModal', { root: true });
      commit('SET_ID_REQUEST', idRequest);
    },
    closeModal({ commit, dispatch }) {
      dispatch('modalsController/hide', 'WithdrawUserRequestModal', { root: true });
      commit('SET_ID_REQUEST', 0);
    },
    async withdrawRequest({ state, commit, dispatch }) {
      commit('modalsController/SET_SENDING', true, { root: true });

      const hadSuccess = await dispatch('myActivities/WithdrawRequest', state.idRequest, { root: true });

      if (hadSuccess) {
        await dispatch('myActivities/getMyActivities', null, { root: true });
        dispatch('closeModal');
      }

      commit('modalsController/SET_SENDING', false, { root: true });
    },
  },
};

export default withdrawUserRequest;
