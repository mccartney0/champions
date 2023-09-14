import axios from 'axios';

const myEvents = {
  namespaced: true,
  state: {
    searching: false,
    sending: false,
    events: [],
    filters: [
      {
        label: 'Created events',
        value: '',
      },
      {
        label: 'Requests',
        value: 'Pending',
      },
      {
        label: 'Approved',
        value: 'Approved',
      },
      {
        label: 'Rejected',
        value: 'Rejected',
      },
    ],
  },
  mutations: {
    SET_SEARCHING(state, payload) {
      state.searching = payload;
    },
    SET_EVENTS(state, payload) {
      state.events = payload;
    },
    SET_SENDING(state, payload) {
      state.sending = payload;
    },
  },
  actions: {
    async getEvents({ commit }, payload) {
      commit('SET_SEARCHING', true);
      commit('SET_EVENTS', []);

      try {
        let url = '/events/requests';
        if (payload !== '') {
          url = `${url}?status=${payload}`;
        }

        const { data } = await axios.get(url);

        commit('SET_EVENTS', data);
      } catch (error) {
        console.error('Failed to get my events', error);
      } finally {
        commit('SET_SEARCHING', false);
      }
    },
    async updateRequestStatus({ commit, dispatch }, payload) {
      const { idRequest, status } = payload;

      commit('SET_SENDING', true);

      try {
        await axios.put(`/events/requests/${idRequest}?status=${status}`);

        const responseMessage = { message: 'Request updated with success', type: 'success' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
      } catch (error) {
        const responseMessage = { message: 'Error to updated a request', type: 'error' };
        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });
      } finally {
        commit('SET_SENDING', false);
      }
    },
  },
};

export default myEvents;
