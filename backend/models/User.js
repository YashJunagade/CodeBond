const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  profilePic: String,
  score: {
    day: { type: Number, default: 0 },
    week: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },

  friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
