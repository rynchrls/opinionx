import axios from "axios";

const baseURL = "https://095122.xyz/api";

const apiClient = axios.create({
  baseURL,
});

export { apiClient };
