import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json, multipart/form-data",
  },
});

class HttpClient {
  get(url, configs) {
    return api.get(url, configs);
  }

  post(url, data, configs) {
    return api.post(url, data, configs);
  }

  put(url, data, configs) {
    return api.put(url, data, configs);
  }

  delete(url, config) {
    return api.delete(url, config);
  }
}

export const httpClient = new HttpClient();
