import axios from "axios";

const baseURL = "https://opinionx-api.onrender.com";

const apiClient = axios.create({
  baseURL,
});

export { apiClient };
