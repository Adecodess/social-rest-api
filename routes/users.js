const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth");
const UserCtrl = require("../controllers/usersController");

// update user
router.put("/:id", UserCtrl.updateUser);

// delete user
router.delete("/:id", UserCtrl.deleteUser);

// get user
router.get(":id", UserCtrl.findUser);

// follow user
router.put("/:id/follow", UserCtrl.followUser);

// unfollow a user
router.put("/:id/unfollow", UserCtrl.UnfollowUser);
module.exports = router;
