import axios from 'axios';

const associateEvent = {
  namespaced: true,
  state: {
    activity: 0,
  },
  mutations: {
    SET_ACTIVITY(state, payload) {
      state.activity = payload;
    },
  },
  actions: {
    openModal({ commit, dispatch }, activity = {}) {
      dispatch('modalsController/show', 'AssociateEventModal', { root: true });
      commit('SET_ACTIVITY', activity);
    },
    closeModal({ commit, dispatch }) {
      dispatch('modalsController/hide', 'AssociateEventModal', { root: true });
      commit('SET_ACTIVITY', {});
    },
    async sendRequest({ state, commit, dispatch }) {
      commit('modalsController/SET_SENDING', true, { root: true });

      try {
        await axios.post(`/events/user-register/${state.activity.idActivity}`, {});

        const successMessage = { type: 'success', message: 'You have successfully signed up for this activity, awaiting host approval' };
        dispatch('alertMessage/createAlertMessage', successMessage, { root: true });

        dispatch('closeModal');
      } catch ({ response }) {
        const errorMessage = { type: 'error', message: response.data.message || 'Error signing up for this activity' };
        dispatch('alertMessage/createAlertMessage', errorMessage, { root: true });
      } finally {
        commit('modalsController/SET_SENDING', false, { root: true });
      }
    },
    async addExternalUser({ state, commit, dispatch }, email) {
      commit('modalsController/SET_SENDING', true, { root: true });

      try {
        await axios.post(`/events/activity/${state.activity.idActivity}/external-user`, email, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });

        const successMessage = { type: 'success', message: 'User added successfully' };
        dispatch('alertMessage/createAlertMessage', successMessage, { root: true });

        await dispatch('eventSearch/searchSpecificEventDetails', null, { root: true });

        dispatch('modalsController/hide', 'AddExternalUserModal', { root: true });
      } catch ({ response }) {
        const errorMessage = { type: 'error', message: response.data.message || 'Error adding user, please try again later' };
        dispatch('alertMessage/createAlertMessage', errorMessage, { root: true });
      } finally {
        commit('modalsController/SET_SENDING', false, { root: true });
      }
    },
  },
};

export default associateEvent;
