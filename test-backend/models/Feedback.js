const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  course: { type: String, required: true },
  faculty: { type: String, required: true },
  comments: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
