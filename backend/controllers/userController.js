// backend/controllers/userController.js
const User = require("../models/User");
const Problem = require("../models/Problem");

const userController = {
  /**
   * Retrieves a user's profile.
   */
  getUserProfile: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /**
   * Updates a user's submission.
   */
  updateUserSubmission: async (req, res) => {
    const userId = req.params.userId;
    const submissionData = req.body; // { qid, solution, timeTaken, progress }

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const problem = await Problem.findById(submissionData.qid);
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }

      const today = new Date().toLocaleDateString("en-CA"); // 'YYYY-MM-DD'
      const problemDateObj = new Date(problem.date);
      const problemDate = problemDateObj.toISOString().split("T")[0];
      const isToday = problemDate === today;

      const category = problem.category; // 'daily' or 'weekly'

      if (!["daily", "weekly"].includes(category)) {
        return res.status(400).json({ message: "Invalid problem category" });
      }

      const isAlreadySolved = user.problemSolved[category]?.some(
        (sub) => sub.qid === submissionData.qid
      );

      if (!isAlreadySolved) {
        user.problemSolved[category].push(submissionData);
        user.score[category === "daily" ? "day" : "week"] += 1;
        user.score.total += 1;
      }

      if (isToday && !user.todayDone) {
        user.todayDone = true;
        user.markModified("todayDone");
      }

      await user.save();
      res.status(200).json({
        message: "Submission updated successfully",
        dailyProblemSolved: user.todayDone,
      });
    } catch (error) {
      console.error("Error updating submission:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getFriendsSolutionsForProblem: async (req, res) => {
    const { userId, problemId } = req.params;

    try {
      // Fetch the user to get the friendList (array of IDs as strings)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const friendsSolutions = [];

      // Fetch all friends as full user documents
      const friends = await User.find({ _id: { $in: user.friendList } });

      for (const friend of friends) {
        const solvedDaily = friend.problemSolved?.daily?.find(
          (entry) => entry.qid === problemId && entry.progress === "solved"
        );

        const solvedWeekly = friend.problemSolved?.weekly?.find(
          (entry) => entry.qid === problemId && entry.progress === "solved"
        );

        const solvedEntry = solvedDaily || solvedWeekly;

        if (solvedEntry) {
          friendsSolutions.push({
            friendId: friend._id,
            name: friend.name,
            avatar: friend.profilePic,
            timeTaken: solvedEntry.timeTaken,
            solution: solvedEntry.solution,
          });
        }
      }
      return res.status(200).json(friendsSolutions);
    } catch (error) {
      console.error("Error fetching friends' solutions:", error);
      res.status(500).json({ message: "Failed to fetch friends' solutions" });
    }
  },
};

module.exports = userController;
