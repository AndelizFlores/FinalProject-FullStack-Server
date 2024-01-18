var express = require('express');
var router = express.Router();

const Post = require("../models/Post");  

const isAuthenticated = require('../middleware/isAuthenticated')

const createPost = async (req, res) => {
  try {
    const { _id, username, location } = req.user
    const { text, game, gameId, photo }  = req.body;

    const newPost = new Post({
      userId: _id,
      username,
      photo,
      location,      
      text,
      game,
      gameId,
      likes: [],
      comments: [],
    });
    let createdPost = await newPost.save();


    res.status(201).json(createdPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


//Read

const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().populate({path: 'userId'}).sort({createdAt: -1})
    console.log("Post====>", post)
    // const sorted = await populated
    
    res.status(200).json(post);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({createdAt: -1});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



//Update

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// READ
router.get("/", isAuthenticated, getFeedPosts);
router.get("/:userId/posts", isAuthenticated, getUserPosts);

router.post('/new-post', isAuthenticated, createPost)

// UPDATE
router.patch("/:id/like", isAuthenticated, likePost);

router.delete('/:postId', isAuthenticated, (req, res, next) => {
  Post.findByIdAndDelete(req.params.postId)
    .then((deletedPost) => {
      res.json(deletedPost)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/udpate/:postId', isAuthenticated, (req, res, next) => {

  Post.findByIdAndUpdate(req.params.postId, {text: req.body.text}, {new: true} )
    .then((updatedPost) => {
      res.json(updatedPost)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;