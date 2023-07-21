const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: String,
  rating: Number,
  profile_pic: String,
  email: String,
  password: String,
  location: String,
  owner: Boolean,
  renter: Boolean,
  website: String,
  phone: String,
  bio: String,
  verified: Boolean,
  verified_doc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'verified_doc' },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;