const Problem = require("../models/Problem");

// Create a new problem
exports.createProblem = async (req, res) => {
  try {
    // Additional validation could be added here
    const problemData = req.body;

    // Check if problem with the same qid already exists
    const existingProblem = await Problem.findOne({ qid: problemData.qid });
    if (existingProblem) {
      return res.status(400).json({
        message: "A problem with this ID already exists",
      });
    }

    const problem = new Problem(problemData);
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (err) {
    console.error("Error creating problem:", err);
    res.status(400).json({
      success: false,
      message: "Failed to create problem",
      error: err.message,
    });
  }
};

// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const { category, level, tags } = req.query;
    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by difficulty level if provided
    if (level) {
      query.level = level;
    }

    // Filter by tags if provided
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $in: tagArray };
    }

    const problems = await Problem.find(query)
      .sort({ date: 1 })
      .select("-testcases"); // Exclude test cases for list view

    res.status(200).json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch problems",
      error: err.message,
    });
  }
};
