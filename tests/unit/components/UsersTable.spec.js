import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import { BTable, BPagination } from "bootstrap-vue";

import { mount, createLocalVue } from "@vue/test-utils";
import UsersTable from "./../../../src/components/UsersTable.vue";

Vue.use(BootstrapVue);
const localVue = createLocalVue();
localVue.use(Vuex);

describe("UsersTable.vue", () => {
  test("table and pagination should be visible only when state.users has value", () => {
    const store = new Vuex.Store({
      state: { users: [{ key: "value" }] },
    });
    const wrapper = mount(UsersTable, { store, localVue });
    const table = wrapper.findComponent(BTable);
    const pagination = wrapper.findComponent(BPagination);

    expect(table.isVisible()).toBeTruthy();
    expect(pagination.isVisible()).toBeTruthy();
  });
});
