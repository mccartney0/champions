const DEFAULT_TIMEOUT = 6000;

const alertMessage = {
  namespaced: true,
  state: {
    type: '',
    message: '',
    display: false,
    timeout: DEFAULT_TIMEOUT,
    key: new Date().getTime(),
  },
  mutations: {
    SET_TYPE(state, payload) {
      state.type = payload;
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_DISPLAY(state, payload) {
      state.display = payload;
    },
    SET_TIMEOUT(state, payload) {
      state.timeout = payload;
    },
    SET_KEY(state, payload) {
      state.key = payload;
    },
  },
  actions: {
    showAlertMessage({ commit }) {
      commit('SET_KEY', new Date().getTime());
      commit('SET_DISPLAY', true);
    },
    closeAlertMessage({ commit }) {
      commit('SET_DISPLAY', false);
    },
    setAlertMessage({ commit }, { type = '', message = '' }) {
      commit('SET_TYPE', type);
      commit('SET_MESSAGE', message);
    },
    createAlertMessage({ dispatch }, payload) {
      dispatch('setAlertMessage', payload);
      dispatch('showAlertMessage');
    },
  },
};

export default alertMessage;
