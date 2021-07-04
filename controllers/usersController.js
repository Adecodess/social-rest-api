const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account updated successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only update your Account", user });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only delete your Account" });
  }
};

// get user
exports.findUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json({ other });
  } catch (error) {
    res.status(500).json(error);
  }
};

// follow a user
exports.followUser = async (req, res) => {
  // rewrite this logic with return early statements to make it clearer

  // for example
  // if ( req.body.userId !== req.params.id ){
  //   return res.status(403).json({ message: "your cant follow yourself" });
  // notice the early return principle working here
  // }

  // try {
  //   const user = await User.findById(req.params.id);
  // }catch(err){

  // }

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "user has been followed" });
      } else {
        res.status(403).json({ message: "you already follow this user" });
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "your cant follow yourself" });
  }
};

// unfollow a user
exports.UnfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "user has been unfollowed" });
      } else {
        res.status(403).json({ message: "you don'/t follow this user" });
      }
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "your cant unfollow yourself" });
  }
};
