import { apiClient } from "../apiClient";
import API_ENDPOINTS from "../API_ENDPOINTS.JS";

const VoteService = {
  create: async (data) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.create_vote(), {
        ...data,
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  get: async (pollId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.get_vote(pollId));
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  get_mine: async (userId, pollId) => {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.get_my_vote(userId, pollId)
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default VoteService;
