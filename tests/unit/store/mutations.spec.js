import mutations from "@/store/mutations";

describe("Mutations", () => {
  test("SET_SEARCH_TERM should set state.term to payload", () => {
    const state = {
      term: "",
    };
    mutations.SET_SEARCH_TERM(state, "teste");
    expect(state.term).toBe("teste");
  });

  test("SET_USERS should set state.users to payload", () => {
    const state = {
      users: [],
    };
    mutations.SET_USERS(state, [{ id: 1 }]);
    expect(state.users).toEqual([{ id: 1 }]);
  });

  test("SET_TOTAL_COUT should set state.total_count to payload", () => {
    const state = {
      total_count: 0,
    };
    mutations.SET_TOTAL_COUT(state, 1);
    expect(state.total_count).toBe(1);
  });

  test("SET_ERRORS should set state.errors to payload", () => {
    const state = {
      errors: [],
    };
    mutations.SET_ERRORS(state, ["error"]);
    expect(state.errors).toEqual(["error"]);
  });
});
