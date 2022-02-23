export default {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_SEARCH_TERM(state, payload) {
    state.term = payload;
  },
  SET_TOTAL_COUT(state, payload) {
    state.total_count = payload;
  },
  SET_ERRORS(state, payload) {
    state.errors = payload;
  },
};
