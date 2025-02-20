const express = require("express");

const voteRoute = express.Router();

const {
  createVote,
  getVote,
  getMyVote,
} = require("../controller/vote.controller");

voteRoute.post("/create", createVote);
voteRoute.get("/", getVote);
voteRoute.get("/my-vote", getMyVote);

module.exports = voteRoute;
