const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  code: { type: String, required: true },
  language: { type: String, required: true },
  results: [
    {
      testcaseInput: String,
      expectedOutput: String,
      actualOutput: String,
      passed: Boolean,
    },
  ],
  timeTaken: Number,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
