const mongoose = require('mongoose');

const propertyAttributeSchema = new mongoose.Schema({
  has_images: Boolean,
  city: String,
  address: String,
  postal_code: String,
  length_of_lease: Number,
  title: String,
  description: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  pets_allowed: Boolean,
  parking_available: Boolean,
  schools_nearby: Boolean,
  utilities_included: Boolean,
  transit_nearby: Boolean,
  ev_charging: Boolean,
  wheelchair_accessible: Boolean,
  laundry_included: Boolean,
  apartment: Boolean,
  townhouse: Boolean,
  house: Boolean,
  condo: Boolean,
  cottage_cabin: Boolean,
  duplex: Boolean,
  studio: Boolean,
  loft: Boolean,
  basement: Boolean,
  laneway_house: Boolean,
});

const PropertyAttribute = mongoose.model('PropertyAttribute', propertyAttributeSchema);

module.exports = PropertyAttribute;