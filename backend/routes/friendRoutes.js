const express = require("express");
const friendController = require("../controllers/friendController");
const router = express.Router();

router.post("/add", friendController.addFriend);
router.get("/progress/:userId", friendController.getFriendsProgress);

module.exports = router;
