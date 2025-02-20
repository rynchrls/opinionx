import { createSlice } from "@reduxjs/toolkit";
import PollService from "../../api/service/poll.service";
import VoteService from "../../api/service/vote.service";

const user = JSON.parse(localStorage.getItem("user"));

const opinionSlice = createSlice({
  name: "opinion",
  initialState: {
    poll: null,
    vote_list: [],
    vote: null,
    my_poll: [],
  },
  reducers: {
    setInitial: (state, action) => {
      state.poll = action.payload.poll;
      state.vote_list = action.payload.vote;
      state.vote = action.payload.my_vote;
      state.my_poll = action.payload.my_poll;
    },
    setPoll: (state, action) => {
      state.poll = action.payload;
    },
    setVote: (state, action) => {
      state.poll = action.payload.updatedPoll;
      state.vote = action.payload.initialVote;
      if (action.payload.add) {
        state.vote_list = [...state.vote_list, action.payload.initialVote];
      }
      const voteList = state.vote_list?.map((obj) => {
        if (obj.user_id === user?._id && obj.poll_id === state.poll?._id) {
          return {
            ...obj,
            vote: action.payload.initialVote.vote,
            updatedAt: new Date(),
          };
        } else {
          return obj;
        }
      });
      state.vote_list = voteList;
    },
  },
});

export const fetchInitial = (pollId, dispatch) => {
  return async () => {
    let initialData = {};

    try {
      if (pollId) {
        const pollRes = await PollService.get(pollId);
        initialData["poll"] = pollRes.data;

        const voteRes = await VoteService.get(pollId);
        initialData["vote"] = voteRes.data;
      }

      if (pollId && user?._id) {
        const myVoteRes = await VoteService.get_mine(user._id, pollId);
        initialData["my_vote"] = myVoteRes.data;
      }
      const myPollRess = await PollService.getMine(user?._id);
      initialData["my_poll"] = myPollRess.data || [];

      dispatch(setInitial(initialData));
    } catch (error) {
      initialData["poll"] = null;
      initialData["vote"] = [];
      initialData["my_vote"] = null;
      dispatch(setInitial(initialData));
      console.error(error.message);
    }
  };
};

export const { setInitial, setPoll, setVote } = opinionSlice.actions;
export default opinionSlice.reducer;
