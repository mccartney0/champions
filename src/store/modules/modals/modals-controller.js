const modalsController = {
  namespaced: true,
  state: {
    display: {
      AssociateEventModal: false,
      CancelEventCreateModal: false,
      InputViewsModal: false,
      ReferFriendModal: false,
      WithdrawUserRequestModal: false,
      AddExternalUserModal: false,
    },
    sending: false,
  },
  mutations: {
    SET_DISPLAY_BY_MODAL_NAME(state, payload) {
      const { name, value } = payload;
      state.display[name] = value;
    },
    SET_SENDING(state, payload) {
      state.sending = payload;
    },
  },
  actions: {
    show({ commit }, modalName) {
      commit('SET_DISPLAY_BY_MODAL_NAME', { name: modalName, value: true });
    },
    hide({ commit }, modalName) {
      commit('SET_DISPLAY_BY_MODAL_NAME', { name: modalName, value: false });
    },
  },
};

export default modalsController;
