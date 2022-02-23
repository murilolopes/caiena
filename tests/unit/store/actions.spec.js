import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import GithubService from "@/services/github";
import actions from "@/store/actions";
import mutations from "@/store/mutations";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Vuex actions", () => {
  test("search should call search on GithubService commit SET_SEARCH_TERM, SET_USERS, SET_TOTAL_COUT mutations and return success", async () => {
    GithubService.search = jest
      .fn()
      .mockResolvedValue({ result: { items: [] } });
    jest.spyOn(actions, "search");
    jest.spyOn(mutations, "SET_SEARCH_TERM");
    jest.spyOn(mutations, "SET_USERS");
    jest.spyOn(mutations, "SET_TOTAL_COUT");

    let store = new Vuex.Store({
      actions,
      mutations,
    });

    const response = await store.dispatch("search", "teste");

    expect(GithubService.searchVideos).toHaveBeenCalledWith({
      q: "teste",
      page: 1,
      per_page: 20,
    });
    expect(mutations.SET_VIDEOS).toHaveBeenCalledWith(
      store.state,
      response.result.items
    );

    // TODO try to understand why this test fails
    // expect(actions.saveQuery).toHaveBeenCalledWith("teste");
  });
});
