import { apiClient } from "../apiClient";
import API_ENDPOINTS from "../API_ENDPOINTS.JS";

const PollService = {
  create: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.create_poll(), {
        ...data,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  get: async (pollId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.get_poll(pollId));
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getMine: async (userId) => {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.get_my_poll(userId)
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default PollService;
