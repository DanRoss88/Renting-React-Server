const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  users_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;