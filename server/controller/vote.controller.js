const Vote = require("../model/vote.schema");
const Poll = require("../model/poll.schema");
const {
  generate,
  fetchAll,
  fetchOne,
  patchOneAndUpdate,
} = require("mongo-query-utils");

const createVote = async (req, res) => {
  try {
    const { vote, name, poll_id, options = [], user_id, index } = req.body;
    if (!vote || !name || !poll_id)
      res.status(400).json({
        message: "Please fill the required fields",
        data: null,
      });
    const isVoted = await fetchOne({ poll_id, user_id }, Vote);
    const poll = await fetchOne({ _id: poll_id }, Poll);
    const newOptions = poll?.options?.map((obj, idx) => {
      if (idx === index) {
        return {
          ...obj,
          votes: obj?.votes + 1,
        };
      } else {
        return obj;
      }
    });
    if (isVoted) {
      const update = await patchOneAndUpdate(
        { poll_id, user_id },
        { vote, index },
        Vote
      );
      const updatedOptions = poll?.options?.map((obj, idx) => {
        if (obj.title === isVoted?.vote && idx === isVoted?.index) {
          return {
            ...obj,
            votes: obj?.votes - 1,
          };
        }
        if (obj.title === vote && idx === index) {
          return {
            ...obj,
            votes: obj?.votes + 1,
          };
        }

        return obj;
      });
      await patchOneAndUpdate(
        { _id: poll_id },
        {
          options: updatedOptions,
        },
        Poll
      );
      res.status(200).json({
        message: "successful",
        data: update,
      });
    } else {
      const newVote = {
        vote,
        name,
        poll_id: poll_id,
        user_id,
        index,
      };
      const create = await generate(newVote, Vote);
      await patchOneAndUpdate(
        { _id: poll_id },
        {
          options: newOptions,
          total_votes: poll.total_votes + 1,
        },
        Poll
      );
      res.status(200).json({
        message: "successful",
        data: create,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

const getVote = async (req, res) => {
  try {
    const { pollId } = req.query;
    if (!pollId)
      res.status(400).json({
        message: "Poll id is required",
        data: null,
      });
    const fetch = await fetchAll({ poll_id: pollId }, Vote, {
      sort: { createdAt: 1 },
    });
    res.status(200).json({
      message: "successful",
      data: fetch,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

const getMyVote = async (req, res) => {
  try {
    const { userId, pollId } = req.query;
    if (!userId)
      res.status(400).json({
        message: "Poll id is required",
        data: null,
      });
    const fetch = await fetchOne({ poll_id: pollId, user_id: userId }, Vote);
    res.status(200).json({
      message: "successful",
      data: fetch,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

module.exports = { createVote, getVote, getMyVote };
