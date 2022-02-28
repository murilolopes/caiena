import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import flushPromises from "flush-promises";

import { mount, createLocalVue } from "@vue/test-utils";
import SearchInput from "./../../../src/components/SearchInput.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("SearchInput.vue", () => {
  test("component should be rendered correctly", () => {
    const wrapper = mount(SearchInput, { localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("search button should be disabled when term is empty", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(SearchInput, { store, localVue });
    const button = wrapper.find("button");

    expect(button.attributes().disabled).toBe("disabled");
  });

  test("search button should not be disabled when term has value", () => {
    const store = new Vuex.Store({});
    const wrapper = mount(SearchInput, {
      store,
      localVue,
      data() {
        return {
          term: "test",
        };
      },
    });
    const button = wrapper.find("button");

    expect(button.attributes().disabled).toBe(undefined);
  });

  test("search button should call search method when term has value", () => {
    const store = new Vuex.Store({});
    jest.spyOn(SearchInput.methods, "search");

    const wrapper = mount(SearchInput, {
      store,
      localVue,
      data() {
        return {
          term: "test",
        };
      },
    });

    wrapper.find("button").trigger("click");

    expect(SearchInput.methods.search).toHaveBeenCalled();
  });

  test("input keyup enter should call search method when term has value", () => {
    const store = new Vuex.Store({});
    jest.spyOn(SearchInput.methods, "search");

    const wrapper = mount(SearchInput, {
      store,
      localVue,
      data() {
        return {
          term: "test",
        };
      },
    });

    wrapper.find("input").trigger("keyup.enter");

    expect(SearchInput.methods.search).toHaveBeenCalled();
  });

  test("search method should dispatch search action", async () => {
    const store = new Vuex.Store({
      actions: { searchVideos: jest.fn() },
    });

    store.dispatch = jest.fn();

    const wrapper = mount(SearchInput, {
      store,
      localVue,
      data() {
        return { term: "test" };
      },
    });

    wrapper.find("button").trigger("click");

    await flushPromises();

    expect(store.dispatch).toHaveBeenCalledWith("search", "test", {
      root: true,
    });
  });
});
