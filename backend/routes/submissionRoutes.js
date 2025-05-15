const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

router.post("/", submissionController.createSubmission);
router.get(
  "/user/:userId/problem/:problemId",
  submissionController.getUserProblemSubmissions
);

module.exports = router;
