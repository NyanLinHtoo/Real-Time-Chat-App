import { apiClient } from "./api-client";

class HttpClient {
  #endPoint;
  constructor(endPoint) {
    this.#endPoint = endPoint;
  }

  getAll() {
    return apiClient.get(this.#endPoint + "/");
  }

  getOne(id) {
    return apiClient.get(this.#endPoint + "/" + id);
  }

  register(payload) {
    return apiClient.post(this.#endPoint + "/register", payload);
  }

  login(payload) {
    return apiClient.post(this.#endPoint + "/login", payload);
  }
}

const create = (endPoint) => {
  return new HttpClient(endPoint);
};

export default create;
