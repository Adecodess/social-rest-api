const Post = require("../models/Post");
const User = require("../models/User");

// create a post

exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "the post has been updated" });
    } else {
      res.status(403).json({ message: "you can only update your post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: "the post has been deleted" });
    } else {
      res.status(403).json({ message: "you can only delete your post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "you liked this post" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "you disliked this post" });
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

// get post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.timelinePost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    // iterate over the followings and add their own before sending
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // add the two arrays together
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
