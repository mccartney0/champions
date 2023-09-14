import axios from 'axios';

const createContent = {
  namespaced: true,
  state: {
    sending: false,
    types: [],
  },
  mutations: {
    SET_SENDING(state, payload) {
      state.sending = payload;
    },
    SET_TYPES(state, payload) {
      state.types = payload;
    },
  },
  actions: {
    getContentTypes({ commit }) {
      commit('SET_TYPES', []);

      try {
        const data = {
          contentType: [
            'Article', 'Certifications', 'Content', 'Event',
          ],
          internalType: [
            'Internal', 'External',
          ],
          activityType: [
            'Enablement', 'Developers', 'Engineering', 'Customers', 'Partner', 'Other',
          ],
          ambassadorType: [
            'Speaker', 'Support online', 'Support presential', 'Host',
          ],
        };

        commit('SET_TYPES', data);
      } catch (error) {
        console.error('Failed to get content type', error);
      }
    },
    async sendRequestToCreateContent({ commit, dispatch }, payload) {
      commit('SET_SENDING', true);

      try {
        await axios.post('/content', payload);

        const responseMessage = { message: 'Content created with success', type: 'success' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
        return true;
      } catch (error) {
        const responseMessage = { message: 'Error to created a content', type: 'error' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
        return false;
      } finally {
        commit('SET_SENDING', false);
      }
    },
  },
};

export default createContent;
