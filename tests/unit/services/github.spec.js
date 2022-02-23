import GithubService from "./../../../src/services/github";

describe("Github service", () => {
  it("should call github users endpoint and return success", async () => {
    const response = {
      items: [{ name: "user" }],
      total_count: 1,
      incomplete_results: false,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const q = "mu";
    const page = 1;
    const result = await GithubService.fetchUsers({ q, page });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=${q}&per_page=20&page=${page}`
    );

    expect(result).toEqual(response);
  });

  it("should call github users endpoint and return failure", async () => {
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
