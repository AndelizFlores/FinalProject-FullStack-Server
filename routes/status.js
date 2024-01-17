var express = require('express');
var router = express.Router();

const Status = require("../models/Status");  

const isAuthenticated = require('../middleware/isAuthenticated');

// Create
const createStatus = async (req, res) => {
  try {
    const { _id, username, photo, location } = req.user;
    const { text }  = req.body;

    const newStatus = new Status({  // Change to newStatus
      userId: _id,
      username,
      photo,
      location,      
      text,
      likes: [],
      comments: [],
    });
    let createdStatus = await newStatus.save();  // Change to newStatus

    res.status(201).json(createdStatus);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Read
const getFeedStatus = async (req, res) => {
  try {
    const statuses = await Status.find().sort({ createdAt: -1 });  // Change to Status
    res.status(200).json(statuses);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const statuses = await Status.find({ userId }).sort({ createdAt: -1 });  // Change to Status
    res.status(200).json(statuses);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update
const likeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const status = await Status.findById(id);  // Change to Status
    const isLiked = status.likes.includes(userId);

    if (isLiked) {
      status.likes = status.likes.filter(likeUserId => likeUserId !== userId);
    } else {
      status.likes.push(userId);
    }

    const updatedStatus = await Status.findByIdAndUpdate(
      id,
      { likes: status.likes },
      { new: true }
    );

    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// READ
router.get("/", isAuthenticated, getFeedStatus);
router.get("/:userId/statuses", isAuthenticated, getUserStatus);  // Change to getUserStatus

// CREATE
router.post('/new-status', isAuthenticated, createStatus);  // Change to createStatus

// UPDATE
router.patch("/:id/like", isAuthenticated, likeStatus);  // Change to likeStatus

module.exports = router;