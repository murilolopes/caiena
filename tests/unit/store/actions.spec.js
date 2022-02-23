import Vue from "vue";
import Vuex from "vuex";
import state from "@/store/state";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import GithubService from "@/services/github";

Vue.use(Vuex);

describe("Vuex actions", () => {
  test("search should call search on GithubService servise and commit SET_SEARCH_TERM, SET_USERS, SET_TOTAL_COUNT mutations on success", async () => {
    GithubService.fetchUsers = jest
      .fn()
      .mockResolvedValueOnce({ items: [], total_count: 0 });

    jest.spyOn(mutations, "SET_SEARCH_TERM");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_TOTAL_COUNT");

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
    expect(mutations.SET_TOTAL_COUNT).toHaveBeenCalledWith(
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

  test("changePage should commit SET_SELECTED_PAGE mutation and dispatch search action", () => {
    jest.spyOn(mutations, "SET_SELECTED_PAGE");
    jest.spyOn(actions, "search");

    let store = new Vuex.Store({
      state,
      actions,
      mutations,
    });

    store.dispatch("changePage", 2);

    expect(mutations.SET_SELECTED_PAGE).toHaveBeenCalledWith(store.state, 2);
    expect(actions.search).toHaveBeenCalled();
  });

  test("clearResults should commit SET_SEARCH_TERM, SET_SELECTED_PAGE, SET_USERS, SET_TOTAL_COUNT mutations", () => {
    jest.spyOn(mutations, "SET_SEARCH_TERM");
    jest.spyOn(mutations, "SET_SELECTED_PAGE");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_TOTAL_COUNT");

    let store = new Vuex.Store({
      state,
      actions,
      mutations,
    });

    store.dispatch("clearResults");

    expect(mutations.SET_SEARCH_TERM).toHaveBeenCalledWith(store.state, "");
    expect(mutations.SET_SELECTED_PAGE).toHaveBeenCalledWith(store.state, 1);
    expect(mutations.SET_USERS).toHaveBeenCalledWith(store.state, []);
    expect(mutations.SET_TOTAL_COUNT).toHaveBeenCalledWith(store.state, 0);
  });
});
