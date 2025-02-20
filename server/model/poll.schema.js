const mongoose = require("mongoose");

const pollSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
    },
    options: [],
    total_votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("poll", pollSchema);
