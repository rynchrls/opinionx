const { generate } = require("mongo-query-utils");
const User = require("../model/user.schema");

const register = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name)
      res.status(400).json({
        message: "Name is required",
        data: null,
      });
    const newUser = {
      name,
    };
    const create = await generate(newUser, User);
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

module.exports = { register };
