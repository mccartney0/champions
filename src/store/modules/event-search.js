import axios from 'axios';

const DEFAULT_EMPTY_SELECTED_FILTERS = {
  categories: [],
  positions: [],
  languages: [],
  lobs: [],
};

const eventSearch = {
  namespaced: true,
  state: {
    filters: {},
    searching: false,
    events: [],
    selectedFilters: { ...DEFAULT_EMPTY_SELECTED_FILTERS },
    searchTerm: '',
    selectedEventDetails: {},
  },
  mutations: {
    SET_FILTERS(state, payload) {
      state.filters = payload;
    },
    SET_SEARCHING(state, payload) {
      state.searching = payload;
    },
    SET_EVENTS(state, payload) {
      state.events = payload;
    },
    SET_SELECTED_FILTERS(state, payload) {
      state.selectedFilters = payload;
    },
    SET_SEARCH_TERM(state, payload) {
      state.searchTerm = payload;
    },
    SET_SELECTED_EVENT_DETAILS(state, payload) {
      state.selectedEventDetails = payload;
    },
  },
  actions: {
    async getSearchFilters({ commit }) {
      commit('SET_FILTERS', {});

      try {
        const { data } = await axios.get('/filters');

        commit('SET_FILTERS', data);
      } catch (error) {
        console.error('Failed to get event filters', error);
      }
    },
    async searchEvents({ state, commit }) {
      commit('SET_EVENTS', []);
      commit('SET_SEARCHING', true);

      try {
        const { data } = await axios.post('/events/search', {
          text: state.searchTerm,
          ...state.selectedFilters,
        });

        commit('SET_EVENTS', data.content);
      } catch (error) {
        console.error('Failed to get event filters', error);
      } finally {
        commit('SET_SEARCHING', false);
      }
    },
    resetSearchParams({ commit, dispatch }) {
      commit('SET_SEARCH_TERM', '');
      commit('SET_SELECTED_FILTERS', { ...DEFAULT_EMPTY_SELECTED_FILTERS });
      dispatch('searchEvents');
    },
    async searchSpecificEventDetails({ state, commit }, payload) {
      const slug = payload || state.selectedEventDetails.slug;
      commit('SET_SELECTED_EVENT_DETAILS', {});

      try {
        const { data } = await axios.get(`/events/${slug}`);

        commit('SET_SELECTED_EVENT_DETAILS', data);
      } catch (error) {
        console.error('Failed to get event details', error);
      }
    },
  },
};

export default eventSearch;
