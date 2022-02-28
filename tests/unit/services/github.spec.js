import GithubService from "./../../../src/services/github";

describe("Github service", () => {
  it("should call github users endpoint and return success with status 200", async () => {
    const response = {
      items: [{ name: "user" }],
      total_count: 1,
      incomplete_results: false,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
        status: 200,
      })
    );

    const q = "mu";
    const page = 1;
    const per_page = 20;
    const result = await GithubService.fetchUsers({ q, page, per_page });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=${q}&per_page=20&page=${page}`
    );

    expect(result).toEqual(response);
  });

  it("should call github users endpoint and return error with status 422", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve("error"),
        status: 422,
      })
    );

    const q = "mu";
    const page = 1;

    try {
      await GithubService.fetchUsers({ q, page });
    } catch (error) {
      expect(error).toEqual("error");
    }
  });

  it("should call github users endpoint and return error with status 422", async () => {
    global.fetch = jest.fn(() => Promise.reject("error"));

    const q = "mu";
    const page = 1;

    try {
      await GithubService.fetchUsers({ q, page });
    } catch (error) {
      expect(error).toEqual("error");
    }
  });
});
