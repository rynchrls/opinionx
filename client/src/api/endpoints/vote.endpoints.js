const voteEndpoints = {
  create_vote: () => {
    return "/vote/create";
  },
  get_vote: (pollId) => {
    return `/vote?pollId=${pollId}`;
  },
  get_my_vote: (userId, pollId) => {
    return `/vote/my-vote?userId=${userId}&pollId=${pollId}`;
  },
};

export default voteEndpoints;
