// routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProblem,
  getAllProblems,
  getProblemByTitle,
} = require("../controllers/problemContoller");

// Problem routes
router.post("/problems", createProblem);
router.get("/problems", getAllProblems);
router.get("/problems/title/:slug", getProblemByTitle);

module.exports = router;
