const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pointsAwarded: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add compound index for efficient queries
historySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('History', historySchema);