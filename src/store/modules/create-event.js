import axios from 'axios';

const DEFAULT_ACTIVITY_TEMPLATE = {
  name: '',
  category: '',
  internalType: '',
  description: '',
  position: '',
  qtyPosition: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  timezone: '',
  languages: [],
  activityType: '',
  link: '',
  country: '',
  state: '',
  city: '',
  address: '',
  tags: [],
  idActivity: null,
  active: true,
  requests: null,
};

const DEFAULT_APPROVER_TEMPLATE = {
  email: '',
  searchTerm: '',
  emailList: [],
  searching: false,
};

const DEFAULT_FORM_TEMPLATE = {
  eventName: '',
  team: '',
  description: '',
  image: '',
  lob: '',
  approvers: [],
  activities: [],
};

let source;

const createEvent = {
  namespaced: true,
  state: {
    sending: false,
    eventDisplayedController: true,
    selectedActivityIndex: 0,
    formOptions: {},
    form: { ...DEFAULT_FORM_TEMPLATE },
  },
  mutations: {
    SET_FORM_OPTIONS(state, payload) {
      state.formOptions = payload;
    },
    SET_EVENT_DISPLAYED_CONTROLLER(state, payload) {
      state.eventDisplayedController = payload;
    },
    SET_SELECTED_ACTIVITY_INDEX(state, payload) {
      state.selectedActivityIndex = payload;
    },
    SET_FORM(state, payload) {
      state.form = payload;
    },
    SET_FORM_EVENT_NAME(state, payload) {
      state.form.eventName = payload;
    },
    SET_FORM_DESCRIPTION(state, payload) {
      state.form.description = payload;
    },
    SET_FORM_IMAGE(state, payload) {
      state.form.image = payload;
    },
    SET_FORM_TEAM(state, payload) {
      state.form.team = payload;
    },
    SET_FORM_LOB(state, payload) {
      state.form.lob = payload;
    },
    SET_FORM_APPROVERS(state, payload) {
      state.form.approvers = payload;
    },
    SET_FORM_APPROVER_SEARCHING_BY_INDEX(state, payload) {
      const { index, data } = payload;
      state.form.approvers[index].searching = data;
    },
    SET_FORM_APPROVER_EMAIL_LIST_BY_INDEX(state, payload) {
      const { index, data } = payload;
      state.form.approvers[index].emailList = data;
    },
    SET_FORM_ACTIVITIES(state, payload) {
      state.form.activities = payload;
    },
    SET_FORM_ACTIVITY_BY_FIELD_AND_INDEX(state, payload) {
      const { field, value } = payload;
      state.form.activities[state.selectedActivityIndex][field] = value;
    },
    SET_FORM_ACTIVITY_START_DATE_BY_INDEX(state, payload) {
      state.form.activities[state.selectedActivityIndex].startDate = payload;
    },
    SET_FORM_ACTIVITY_ACTIVITY_TYPE_BY_INDEX(state, payload) {
      state.form.activities[state.selectedActivityIndex].activityType = payload;
    },
    SET_SENDING(state, payload) {
      state.sending = payload;
    },
  },
  getters: {
    getSelectedGeneration(state) {
      return state.form.activities[state.selectedActivityIndex];
    },
  },
  actions: {
    async getFormOptions({ state, commit }) {
      if (Object.keys(state.formOptions).length <= 0) {
        commit('SET_FORM_OPTIONS', {});

        try {
          const { data } = await axios.get('/form/options');
          commit('SET_FORM_OPTIONS', data);
        } catch (error) {
          console.error('Failed to get form options', error);
        }
      }
    },
    resetForm({ commit }) {
      commit('SET_FORM', { ...DEFAULT_FORM_TEMPLATE });
      commit('SET_FORM_APPROVERS', []);
      commit('SET_FORM_ACTIVITIES', []);
      commit('SET_EVENT_DISPLAYED_CONTROLLER', true);
    },
    addApprover({ state, commit }) {
      const { approvers } = state.form;

      approvers.push({ ...DEFAULT_APPROVER_TEMPLATE });

      commit('SET_FORM_APPROVERS', approvers);
    },
    removeApproverByIndex({ state, commit }, payload) {
      const { approvers } = state.form;

      approvers.splice(payload, 1);

      commit('SET_FORM_APPROVERS', approvers);
    },
    async searchEmails({ state, commit }, payload) {
      const approver = { ...state.form.approvers[payload] };

      if (approver.searchTerm !== undefined && approver.searchTerm !== null) {
        if (approver.searchTerm.length >= 3) {
          if (source) {
            source.cancel('Operation canceled by the user.');
          }

          source = axios.CancelToken.source();

          try {
            commit('SET_FORM_APPROVER_SEARCHING_BY_INDEX', { index: payload, data: true });

            const requestUrl = `../smo-server/employees/email-list?email=${approver.searchTerm}`;
            const { data } = await axios.get(
              requestUrl,
              {
                params: {
                  customerName: payload,
                },
                cancelToken: source.token,
              },
            );

            const emailList = data.map((user) => (user.value));
            commit('SET_FORM_APPROVER_EMAIL_LIST_BY_INDEX', { index: payload, data: emailList });
          } catch (error) {
            if (axios.isCancel(error)) {
              console.warn('Request canceled: ', error.message);
            } else {
              console.error('Failed to search emails');
            }
          } finally {
            commit('SET_FORM_APPROVER_SEARCHING_BY_INDEX', { index: payload, data: false });
          }
        }
      }
    },
    createNewActivity({ state, commit }) {
      const { activities } = state.form;

      activities.push({ ...DEFAULT_ACTIVITY_TEMPLATE });

      commit('SET_FORM_ACTIVITIES', activities);
      commit('SET_SELECTED_ACTIVITY_INDEX', activities.length - 1);
    },
    removeActivityByIndex({ state, commit }, payload) {
      const { activities } = state.form;
      const beforeActivityIndex = payload - 1;

      activities.splice(payload, 1);

      if (state.selectedActivityIndex === payload) {
        commit('SET_SELECTED_ACTIVITY_INDEX', beforeActivityIndex);
      }

      commit('SET_FORM_ACTIVITIES', activities);
    },
    duplicateActivityByIndex({ state, commit }, payload) {
      const { activities } = state.form;
      const selectedActivity = {
        ...state.form.activities[payload],
        idActivity: null,
        active: true,
        requests: null,
      };

      activities.push(selectedActivity);

      commit('SET_FORM_ACTIVITIES', activities);
    },
    async sendRequestToCreateEvent({ commit, dispatch }, payload) {
      try {
        commit('SET_SENDING', true);

        await axios.post('/events', payload);

        const response = { type: 'success', message: 'This event has been created' };
        dispatch('alertMessage/createAlertMessage', response, { root: true });

        return true;
      } catch ({ response }) {
        const responseMessage = { type: 'error', message: response.data.message };

        if (response.data.errors.length > 0 && response.status === 400) {
          responseMessage.message = response.data.errors.join('<br />');
        }

        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });

        return false;
      } finally {
        commit('SET_SENDING', false);
      }
    },
    async sendRequestToEditEvent({ state, commit, dispatch }, payload) {
      try {
        commit('SET_SENDING', true);

        await axios.put(`/events/${state.form.slug}`, payload);

        const response = { type: 'success', message: 'Event updated with success' };
        dispatch('alertMessage/createAlertMessage', response, { root: true });

        return true;
      } catch ({ response }) {
        const responseMessage = { type: 'error', message: response.data.message };

        if (response.data.errors.length > 0 && response.status === 400) {
          responseMessage.message = response.data.errors.join('<br />');
        }

        dispatch('alertMessage/createAlertMessage', responseMessage, { root: true });

        return false;
      } finally {
        commit('SET_SENDING', false);
      }
    },
    formatEventToEditForm({ commit }, payload) {
      const event = payload;

      const templateEvent = {
        ...DEFAULT_FORM_TEMPLATE,
        ...event,
      };

      templateEvent.approvers = event.hosts.map((host) => {
        const approver = {
          ...DEFAULT_APPROVER_TEMPLATE,
          email: host,
          emailList: [host],
        };

        return approver;
      });

      templateEvent.activities = event.activities.map((activity) => {
        const formattedActivity = {
          ...DEFAULT_ACTIVITY_TEMPLATE,
          ...activity,
          activityType: activity.type,
          position: activity.position.name,
          qtyPosition: activity.position.qtyLimit,
          requests: activity.position.users.length,
          startDate: activity.startDateTime.substring(0, 10),
          startTime: activity.startDateTime.substring(11, 16),
          endDate: activity.endDateTime.substring(0, 10),
          endTime: activity.endDateTime.substring(11, 16),
          internalType: activity.internalType,
        };

        return formattedActivity;
      });

      commit('SET_FORM', templateEvent);
    },
  },
};

export default createEvent;
