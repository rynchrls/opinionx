import axios from "axios";

const baseURL = `${window.location.href}/api`;

const apiClient = axios.create({
  baseURL,
});

export { apiClient };
