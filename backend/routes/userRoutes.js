// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust the path

// Define user routes
router.get("/:userId", userController.getUserProfile);
router.post("/:userId/submissions", userController.updateUserSubmission);
// Add other user-related routes here

module.exports = router;
