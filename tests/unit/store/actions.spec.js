import Vue from "vue";
import Vuex from "vuex";
import state from "@/store/state";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import GithubService from "@/services/github";
import Swal from "sweetalert2";

Vue.use(Vuex);

describe("Vuex actions", () => {
  test("search should call SET_BUSY mutation, search on GithubService servise and commit SET_USERS, SET_TOTAL_COUNT mutations on success", async () => {
    GithubService.fetchUsers = jest
      .fn()
      .mockResolvedValueOnce({ items: [], total_count: 0 });

    jest.spyOn(mutations, "SET_BUSY");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_TOTAL_COUNT");

    let store = new Vuex.Store({
      state: { term: "teste", selected_page: 2, per_page: 20 },
      actions,
      mutations,
    });

    const response = await store.dispatch("search");

    expect(GithubService.fetchUsers).toHaveBeenCalledWith({
      q: "teste",
      page: 2,
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
    expect(mutations.SET_BUSY).toHaveBeenCalledTimes(2);
  });

  test("search should call SET_BUSY mutation, search on GithubService servise dispatch clearResults action commit SET_ERRORS mutations and show swal erro on failure", async () => {
    GithubService.fetchUsers = jest
      .fn()
      .mockRejectedValueOnce("Messagem de erro");

    jest.spyOn(mutations, "SET_BUSY");
    jest.spyOn(mutations, "SET_ERRORS");
    jest.spyOn(actions, "clearResults");
    jest.spyOn(Swal, "fire");

    let store = new Vuex.Store({
      state: { term: "teste", selected_page: 2, per_page: 20 },
      actions,
      mutations,
    });

    try {
      await store.dispatch("search");
    } catch (error) {
      expect(actions.clearResults).toHaveBeenCalled();
      expect(mutations.SET_ERRORS).toHaveBeenCalledWith(store.state, error);
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }

    expect(mutations.SET_BUSY).toHaveBeenCalledTimes(4);
  });

  test("search should call SET_BUSY, SET_SEARCH_TERM, SET_SELECTED_PAGE mutation, search on GithubService servise and commit SET_USERS, SET_TOTAL_COUNT mutations on success", async () => {
    GithubService.fetchUsers = jest
      .fn()
      .mockResolvedValueOnce({ items: [], total_count: 0 });

    jest.spyOn(mutations, "SET_BUSY");
    jest.spyOn(mutations, "SET_SEARCH_TERM");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_SELECTED_PAGE");
    jest.spyOn(mutations, "SET_TOTAL_COUNT");

    let store = new Vuex.Store({
      state,
      actions,
      mutations,
    });

    const response = await store.dispatch("search", "teste2");

    expect(GithubService.fetchUsers).toHaveBeenCalledWith({
      q: "teste2",
      page: 1,
      per_page: 20,
    });
    expect(mutations.SET_SEARCH_TERM).toHaveBeenCalledWith(
      store.state,
      "teste2"
    );
    expect(mutations.SET_SELECTED_PAGE).toHaveBeenCalledWith(store.state, 1);
    expect(mutations.SET_USERS).toHaveBeenCalledWith(
      store.state,
      response.items
    );
    expect(mutations.SET_TOTAL_COUNT).toHaveBeenCalledWith(
      store.state,
      response.total_count
    );
    expect(mutations.SET_BUSY).toHaveBeenCalledTimes(6);
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
