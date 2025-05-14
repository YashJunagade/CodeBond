const Problem = require("../models/Problem");

// Create a new problem
exports.createProblem = async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get problem by title slug
exports.getProblemByTitle = async (req, res) => {
  try {
    const slug = req.params.slug;

    // First try exact match with slug
    let problem = await Problem.findOne({
      title: { $regex: new RegExp(`^${slug}$`, "i") },
    });

    // If not found, try with dashes replaced by spaces
    if (!problem) {
      const titleWithSpaces = slug.replace(/-/g, " ");
      problem = await Problem.findOne({
        title: { $regex: new RegExp(`^${titleWithSpaces}$`, "i") },
      });
    }

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: `Problem with title "${slug}" not found`,
      });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error("Error fetching problem by title:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
