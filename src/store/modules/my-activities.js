import axios from 'axios';

const myActivities = {
  namespaced: true,
  state: {
    searching: false,
    sending: false,
    activities: [],
  },
  mutations: {
    SET_ACTIVITIES(state, payload) {
      state.activities = payload;
    },
    SET_SENDING(state, payload) {
      state.sending = payload;
    },
    SET_SEARCHING(state, payload) {
      state.searching = payload;
    },
  },
  actions: {
    async getMyActivities({ commit }) {
      commit('SET_SEARCHING', true);

      try {
        const { data } = await axios.get('/events/my-activities');

        commit('SET_ACTIVITIES', data);
      } catch (error) {
        console.error('Failed to get my activities', error);
      } finally {
        commit('SET_SEARCHING', false);
      }
    },
    async WithdrawRequest({ commit, dispatch }, idRequest) {
      commit('SET_SENDING', true);

      try {
        await axios.put(`/events/requests/${idRequest}?status=Rejected`);

        const responseMessage = { message: 'Request withdrawn successfully', type: 'success' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
        return true;
      } catch (error) {
        const responseMessage = { message: 'Error to Withdraw a request', type: 'error' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
        return false;
      } finally {
        commit('SET_SENDING', false);
      }
    },
  },
};

export default myActivities;
