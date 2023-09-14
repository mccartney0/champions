import Vue from 'vue';
import Vuex from 'vuex';

import userProfile from './modules/user-profile';
import eventSearch from './modules/event-search';
import alertMessage from './modules/alert-message';
import createEvent from './modules/create-event';
import createContent from './modules/create-content';
import myEvents from './modules/my-events';
import myActivities from './modules/my-activities';
import modalsController from './modules/modals/modals-controller';
import withdrawUserRequest from './modules/modals/withdraw-user-request';
import referFriend from './modules/modals/refer-friend';
import inputViews from './modules/modals/input-views';
import associateEvent from './modules/modals/associate-event';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userProfile,
    eventSearch,
    alertMessage,
    createEvent,
    createContent,
    myEvents,
    myActivities,
    modalsController,
    withdrawUserRequest,
    referFriend,
    inputViews,
    associateEvent,
  },
});
