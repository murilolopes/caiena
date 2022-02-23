import GithubService from "@/services/github";
import Swal from "sweetalert2";

export default {
  async search({ commit, dispatch, rootState }, term = null) {
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
          commit("SET_TOTAL_COUNT", result.total_count);
          resolve(result);
        })
        .catch((error) => {
          dispatch("clearResults");
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
          });
          commit("SET_ERRORS", error);
          reject(error);
        })
        .finally(() => {
          commit("SET_BUSY");
        });
    });
  },

  clearResults({ commit }) {
    commit("SET_SEARCH_TERM", "");
    commit("SET_SELECTED_PAGE", 1);
    commit("SET_USERS", []);
    commit("SET_TOTAL_COUNT", 0);
  },

  changePage({ commit, dispatch }, page) {
    commit("SET_SELECTED_PAGE", page);
    dispatch("search");
  },
};
