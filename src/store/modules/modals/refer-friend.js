import axios from 'axios';

const referFriend = {
  namespaced: true,
  state: {
    event: {},
  },
  mutations: {
    SET_EVENT(state, payload) {
      state.event = payload;
    },
  },
  actions: {
    openModal({ commit, dispatch }, event = {}) {
      dispatch('modalsController/show', 'ReferFriendModal', { root: true });
      commit('SET_EVENT', event);
    },
    closeModal({ commit, dispatch }) {
      dispatch('modalsController/hide', 'ReferFriendModal', { root: true });
      commit('SET_EVENT', {});
    },
    async sendRequest({ state, commit, dispatch }, email) {
      commit('modalsController/SET_SENDING', true, { root: true });

      const objectRequest = { to: email, idEvent: state.event.idEvent };

      try {
        await axios.post('/events/refer-a-friend/', objectRequest);

        const successMessage = { type: 'success', message: 'Invitation was sent successfully' };
        dispatch('alertMessage/createAlertMessage', successMessage, { root: true });

        dispatch('closeModal');
      } catch ({ response }) {
        const errorMessage = { type: 'error', message: response.data.message || 'Error to send invite' };
        dispatch('alertMessage/createAlertMessage', errorMessage, { root: true });
      } finally {
        commit('modalsController/SET_SENDING', false, { root: true });
      }
    },
  },
};

export default referFriend;
