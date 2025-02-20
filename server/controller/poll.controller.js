const Poll = require("../model/poll.schema");
const { generate, fetchOne, fetchAll } = require("mongo-query-utils");

const createPoll = async (req, res) => {
  try {
    const { title, options, user_id } = req.body;

    if (!title || !options)
      res.status(400).json({
        message: "title and options are required",
        data: null,
      });
    const newPoll = {
      title,
      options,
      user_id,
    };
    const create = await generate(newPoll, Poll);
    res.status(200).json({
      message: "successful",
      data: create,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
};

const getPoll = async (req, res) => {
  try {
    const { pollId } = req.query;
    if (!pollId)
      res.status(400).json({
        message: "Poll id is required",
        data: null,
      });
    const fetch = await fetchOne({ _id: pollId }, Poll);
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

const getUserPoll = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId)
      res.status(400).json({
        message: "User id is required",
        data: null,
      });
    const fetch = await fetchAll({ user_id: userId }, Poll);
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

module.exports = { createPoll, getPoll, getUserPoll };
