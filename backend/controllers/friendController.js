const User = require("../models/User");

// Add a friend to the user's friend list
exports.addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    // Find the current user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the friend to be added
    const friend = await User.findOne({ _id: friendId });
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Check if the friend is already in the friend list
    if (user.friendList.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    // Add the friend's ID to the user's friend list
    user.friendList.push(friendId);
    await user.save();

    res.status(200).json({
      message: "Friend added successfully",
      updatedFriends: user.friendList,
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Failed to add friend" });
  }
};

// Get the progress of the user's friends
exports.getFriendsProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId }).populate("friendList");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the progress information of the friends
    const friendsProgress = user.friendList.map((friend) => ({
      name: friend.name,
      avatar: friend.profilePic,
      dayStreak: friend.score.day,
      weekStreak: friend.score.week,
      totalScore: friend.score.total,
      todayStatus: friend.todayDone ? "Done" : "Not Done",
      id: friend.id,
    }));

    res.status(200).json(friendsProgress);
  } catch (error) {
    console.error("Error fetching friends progress:", error);
    res.status(500).json({ message: "Failed to fetch friends progress" });
  }
};
