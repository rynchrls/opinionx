const express = require("express");

const pollRoute = express.Router();

const {
  createPoll,
  getPoll,
  getUserPoll,
} = require("../controller/poll.controller");

pollRoute.post("/create", createPoll);
pollRoute.get("/", getPoll);
pollRoute.get("/user", getUserPoll);

module.exports = pollRoute;
