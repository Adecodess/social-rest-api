const express = require("express");
const router = express.Router();
const PostCtrl = require("../controllers/postsController");

// create a post
router.post("/", PostCtrl.createPost);

// update post
router.put("/:id", PostCtrl.updatePost);
// delete user
router.delete("/:id", PostCtrl.deletePost);

// like/dislike
router.put("/:id/like", PostCtrl.likePost);

// get post
router.get("/:id", PostCtrl.getPost);

// get timeline post
router.get("/timeline/all ", PostCtrl.timelinePost);
module.exports = router;
