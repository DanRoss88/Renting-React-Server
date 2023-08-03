const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
user_type: {
  type: String,
  enum: ["owner", "renter"],
  required: [true, "Please enter your status"],
},
full_name: {
  type: String,
  required: [true, "Please enter your full name"],
},
profile_picture: {
  type: String,
},
bio : {
  type: String,
},
location: {
  type: String,
},
phone: {
  type: String,
},
website: {
  type: String,
},
verified: {
  type: Boolean,
  default: false,
},
verified_doc: {
  type: String,
},
agreement: {
  type: Boolean,
  default: false,
},
created_at: {
  type: Date,
  default: Date.now,
  }
});


module.exports = mongoose.model("Profile", profileSchema);