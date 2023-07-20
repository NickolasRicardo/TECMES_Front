import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7241/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  }
);

export default api;
