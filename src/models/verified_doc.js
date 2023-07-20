const mongoose = require('mongoose');

const verifiedDocSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doc_name: String,
  doc_file: String,
  upload_date: { type: Date, default: Date.now },
});

const VerifiedDoc = mongoose.model('VerifiedDoc', verifiedDocSchema);

module.exports = VerifiedDoc;