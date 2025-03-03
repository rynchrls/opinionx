import axios from "axios";

const baseURL = `${window.location.origin}/api`;

const apiClient = axios.create({
  baseURL,
});

export { apiClient };
