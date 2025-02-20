const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    vote: {
      type: String,
    },
    name: {
      type: String,
    },
    poll_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    index: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vote", voteSchema);
