const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.dev" });
const app = express();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const PORT = process.env.PORT || 5001;

dbConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * for cors policy
 */
const corsOption = {
  origin: [process.env.CLIENT_PORT, process.env.CNAME],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));

/**
 * routes
 */
const userRoute = require("./route/user.route");
const pollRoute = require("./route/poll.route");
const voteRoute = require("./route/vote.route");

app.use("/user", userRoute);
app.use("/poll", pollRoute);
app.use("/vote", voteRoute);

app.listen(PORT, () => {
  console.log(` The server is running on port: ${PORT}`);
});
