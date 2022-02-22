class Github {
  BASE_PATH = "https://api.github.com";

  async fetchUsers({ q, page }) {
    const per_page = 20;

    try {
      const result = await fetch(
        `${this.BASE_PATH}/search/users?q=${q}&per_page=${per_page}&page=${page}`
      );

      const data = await result.json();
      return data;
    } catch (e) {
      return e;
    }
  }
}

export default new Github();
