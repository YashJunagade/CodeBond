const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  qid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
  tags: [String],
  description: { type: String, required: true },
  example: String,
  boilerplate: { type: String },
  testcases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  timeLimit: { type: Number, default: 0 },
  category: { type: String, enum: ["daily", "weekly"], required: true },
  dayOrWeekNo: { type: Number, required: true },
  weekDay: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  date: { type: Date, required: true },
});

// Optional: track updated time
problemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Problem", problemSchema);
