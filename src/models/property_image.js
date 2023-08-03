const mongoose = require('mongoose');

const propertyImageSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  image_file: { type: String,
    required: [true, 'Please enter an image file'],
  },
  image_size: { type: Number,
    required: [true, 'Please enter an image size'],
  },
  upload_date: { type: Date, default: Date.now },
});

const PropertyImage = mongoose.model('PropertyImage', propertyImageSchema);

module.exports = PropertyImage;
