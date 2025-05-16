// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust the path

// Define user routes
router.get("/:userId", userController.getUserProfile);
router.post("/:userId/submissions", userController.updateUserSubmission);
router.get(
  "/friends-solutions/:userId/:problemId",
  userController.getFriendsSolutionsForProblem
);

module.exports = router;
