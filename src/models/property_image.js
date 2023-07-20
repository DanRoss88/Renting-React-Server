const mongoose = require('mongoose');

const propertyImageSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  image_file: String,
  image_size: Number,
  upload_date: { type: Date, default: Date.now },
});

const PropertyImage = mongoose.model('PropertyImage', propertyImageSchema);

module.exports = PropertyImage;
