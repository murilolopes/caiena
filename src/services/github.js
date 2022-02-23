class Github {
  BASE_PATH = "https://api.github.com";

  async fetchUsers({ q, page, per_page }) {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.BASE_PATH}/search/users?q=${q}&per_page=${per_page}&page=${page}`
      )
        .then((result) => {
          result.json().then((response) => {
            resolve(response);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new Github();
