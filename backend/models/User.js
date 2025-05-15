const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  profilePic: String,
  score: {
    day: Number,
    week: Number,
    total: Number,
  },
  friendList: [{ type: String, ref: "User" }],
  todayDone: Boolean,
  problemSolved: {
    daily: [
      {
        qid: String,
        progress: String,
        solution: String,
        timeTaken: Number,
      },
    ],
    weekly: [
      {
        qid: String,
        progress: String,
        solution: String,
        timeTaken: Number,
      },
    ],
  },
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
