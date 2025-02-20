import { apiClient } from "../apiClient";
import API_ENDPOINTS from "../API_ENDPOINTS.JS";

const UserService = {
  regiser: async (name) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.register_user(name));
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default UserService;
