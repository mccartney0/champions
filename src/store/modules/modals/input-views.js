import axios from 'axios';

const inputViews = {
  namespaced: true,
  state: {
    idActivity: 0,
  },
  mutations: {
    SET_ID_ACTIVITY(state, payload) {
      state.idActivity = payload;
    },
  },
  actions: {
    openModal({ commit, dispatch }, idActivity = 0) {
      dispatch('modalsController/show', 'InputViewsModal', { root: true });
      commit('SET_ID_ACTIVITY', idActivity);
    },
    closeModal({ commit, dispatch }) {
      dispatch('modalsController/hide', 'InputViewsModal', { root: true });
      commit('SET_ID_ACTIVITY', 0);
    },
    async sendRequest({ state, commit, dispatch }, views) {
      commit('modalsController/SET_SENDING', true, { root: true });

      try {
        await axios.post(`/activity/${state.idActivity}/views`, {
          quantity: views,
        });

        await dispatch('eventSearch/searchSpecificEventDetails', null, { root: true });

        const successMessage = { type: 'success', message: 'Views submitted with success' };
        dispatch('alertMessage/createAlertMessage', successMessage, { root: true });

        dispatch('closeModal');
      } catch ({ response }) {
        const errorMessage = { type: 'error', message: response.data.message || 'Error to submit views' };
        this.$store.dispatch('alertMessage/createAlertMessage', errorMessage, { root: true });
      } finally {
        commit('modalsController/SET_SENDING', false, { root: true });
      }
    },
  },
};

export default inputViews;
