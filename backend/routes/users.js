const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

// GET /users - Fetch all users sorted by points (leaderboard)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1, createdAt: 1 });
    
    // Add ranking to each user
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    res.json(usersWithRank);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /users - Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this name already exists' });
    }
    
    const newUser = new User({ 
      name: name.trim(),
      points: 0 
    });
    
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /claim/:id - Claim random points for a user
router.post('/claim/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate random points between 1 and 10
    const pointsAwarded = Math.floor(Math.random() * 10) + 1;
    
    // Update user points
    user.points += pointsAwarded;
    await user.save();
    
    // Log in history
    const historyEntry = new History({
      userId: user._id,
      pointsAwarded
    });
    await historyEntry.save();
    
    // Get updated leaderboard
    const users = await User.find().sort({ points: -1, createdAt: 1 });
    const usersWithRank = users.map((u, index) => ({
      ...u.toObject(),
      rank: index + 1
    }));
    
    res.json({
      user: {
        ...user.toObject(),
        rank: usersWithRank.findIndex(u => u._id.toString() === user._id.toString()) + 1
      },
      pointsAwarded,
      leaderboard: usersWithRank
    });
    
  } catch (error) {
    console.error('Error claiming points:', error);
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

// GET /history/:id - Get claim history for a user
router.get('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const history = await History.find({ userId: id })
      .sort({ timestamp: -1 })
      .populate('userId', 'name');
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;