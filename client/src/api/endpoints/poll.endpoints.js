const pollEndpoints = {
  create_poll: () => {
    return "/poll/create";
  },
  get_poll: (pollId) => {
    return `/poll?pollId=${pollId}`;
  },
  get_my_poll: (userId) => {
    return `/poll/user?userId=${userId}`;
  },
};

export default pollEndpoints;
