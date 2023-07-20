const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  users_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review_text: String,
  rating_number: Number,
  created_at: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
