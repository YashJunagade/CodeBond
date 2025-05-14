// routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProblem,
  getAllProblems,
} = require("../controllers/problemCountoller"); // typo here: see below

router.post("/problems", createProblem);
router.get("/problems", getAllProblems);

module.exports = router;
