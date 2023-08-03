const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  property_image_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyImage' },
  property_attributes_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PropertyAttribute' },
  created_at: { type: Date, default: Date.now },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;