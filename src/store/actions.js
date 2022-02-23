import GithubService from "@/services/github";

export default {
  async search({ commit, rootState }, term) {
    return new Promise((resolve, reject) => {
      commit("SET_SEARCH_TERM", term);
      const payload = {
        q: term,
        page: rootState.selectedPage,
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
        });
    });
  },
};
