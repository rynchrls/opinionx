import userEndpoints from "./endpoints/user.endpoints";
import pollEndpoints from "./endpoints/poll.endpoints";
import voteEndpoints from "./endpoints/vote.endpoints";

const API_ENDPOINTS = {
  ...userEndpoints,
  ...pollEndpoints,
  ...voteEndpoints,
};

export default API_ENDPOINTS;
