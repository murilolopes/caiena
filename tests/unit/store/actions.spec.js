import Vue from "vue";
import Vuex from "vuex";
import state from "@/store/state";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import GithubService from "@/services/github";

Vue.use(Vuex);

describe("Vuex actions", () => {
  test("search should call search on GithubService servise and commit SET_SEARCH_TERM, SET_USERS, SET_TOTAL_COUT mutations on success", async () => {
    GithubService.fetchUsers = jest
      .fn()
      .mockResolvedValueOnce({ items: [], total_count: 0 });

    jest.spyOn(mutations, "SET_SEARCH_TERM");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_TOTAL_COUT");

    let store = new Vuex.Store({
      state,
      actions,
      mutations,
    });

    const response = await store.dispatch("search", "teste");

    expect(mutations.SET_SEARCH_TERM).toHaveBeenCalledWith(state, "teste");
    expect(GithubService.fetchUsers).toHaveBeenCalledWith({
      q: "teste",
      page: 1,
      per_page: 20,
    });
    expect(mutations.SET_USERS).toHaveBeenCalledWith(
      store.state,
      response.items
    );
    expect(mutations.SET_TOTAL_COUT).toHaveBeenCalledWith(
      store.state,
      response.total_count
    );
  });

  test("search should call search on GithubService servise and commit SET_ERRORS mutations on failure", async () => {
    GithubService.fetchUsers = jest.fn().mockRejectedValueOnce("error");

    jest.spyOn(mutations, "SET_ERRORS");

    let store = new Vuex.Store({
      state,
      actions,
      mutations,
    });

    try {
      await store.dispatch("search", "teste");
    } catch (error) {
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, "error");
    }
  });
});
