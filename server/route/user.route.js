const express = require("express");

const userRoute = express.Router();

const { register } = require("../controller/user.controller");

userRoute.post("/register", register);

module.exports = userRoute;
