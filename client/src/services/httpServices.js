import { apiClient } from "./api-client";

class HttpClient {
  #endPoint;
  constructor(endPoint) {
    this.#endPoint = endPoint;
  }

  getAll() {
    return apiClient.get(this.#endPoint + "/");
  }

  createMessage(payload) {
    return apiClient.post(this.#endPoint + "/", payload);
  }

  getOne(id) {
    return apiClient.get(this.#endPoint + "/" + id);
  }

  findUser(id) {
    return apiClient.get(this.#endPoint + "/find/" + id);
  }

  createChat(firstId, secondId) {
    return apiClient.post(this.#endPoint + "/", firstId, secondId);
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
