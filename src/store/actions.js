import GithubService from "@/services/github";

export default {
  async search({ commit, rootState }, term = null) {
    return new Promise((resolve, reject) => {
      commit("SET_BUSY");

      if (term) {
        commit("SET_SEARCH_TERM", term);
        commit("SET_SELECTED_PAGE", 1);
      }

      const payload = {
        q: rootState.term,
        page: rootState.selected_page,
        per_page: rootState.per_page,
      };

      GithubService.fetchUsers(payload)
        .then((result) => {
          commit("SET_USERS", result.items);
          commit("SET_TOTAL_COUT", result.total_count);
          resolve(result);
        })
        .catch((error) => {
          commit("SET_ERRORS", error);
          reject(error);
        })
        .finally(() => {
          commit("SET_BUSY");
        });
    });
  },

  changePage({ commit, dispatch }, page) {
    commit("SET_SELECTED_PAGE", page);
    dispatch("search");
  },
};
