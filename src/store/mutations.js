export default {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_SEARCH_TERM(state, payload) {
    state.term = payload;
  },
  SET_TOTAL_COUT(state, payload) {
    if (payload > state.per_page) state.total_count = payload - state.per_page;
    if (payload <= state.per_page) state.total_count = payload;
  },
  SET_ERRORS(state, payload) {
    state.errors = payload;
  },
  SET_SELECTED_PAGE(state, payload) {
    state.selected_page = payload;
  },
  SET_BUSY(state) {
    state.busy = !state.busy;
  },
};
