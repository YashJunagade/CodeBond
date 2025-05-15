const Submission = require("../models/Submission");

exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    console.error("Error creating submission:", err);
    res.status(500).json({ message: "Server error creating submission." });
  }
};

exports.getUserProblemSubmissions = async (req, res) => {
  const { userId, problemId } = req.params;
  try {
    const submissions = await Submission.find({ userId, problemId })
      .sort({ submittedAt: -1 })
      .populate("problemId", "title level");
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions for user and problem:", err);
    res.status(500).json({ message: "Server error fetching submissions." });
  }
};
