class Github {
  BASE_PATH = "https://api.github.com";

  async fetchUsers({ q, page, per_page }) {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.BASE_PATH}/search/users?q=${q}&per_page=${per_page}&page=${page}`
      )
        .then((result) => {
          if (result.status === 200) {
            result.json().then((response) => {
              resolve(response);
            });
          }

          if (result.status === 422) {
            result.json().then((error) => {
              reject(error);
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new Github();
