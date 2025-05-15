const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, name, profilePic } = req.body;
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already exists" });
    const newUser = new User({ username, name, approved: false, profilePic });
    await newUser.save();
    res.status(201).json({ message: "Registered! Wait for admin approval." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (!user.approved)
      return res.status(403).json({ message: "User not approved yet" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
