// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const saltRounds = 12; // Number of salt rounds

// const userSchema = new mongoose.Schema({
//   full_name: { 
//     type: String,
//     required: [true, 'Please enter your full name'],
//   },
//   username:{
//     type: String,
//     required: [true, 'Please enter a username'],
//     unique: true,
//   },
//   rating:{
//     type: Number,
//     default: 0,
//   },
//   profile_pic: {
//     type: String,
//   },
//   email: { 
//     type: String,
//     required: [true, 'Please enter an email'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Please enter a password'],
//     minlength: [6, 'Minimum password length is 6 characters'],
//   },
//   location: { 
//     type:String,
//     required: [true, 'Please enter your location'],
//   },
//   owner: {
//     type: Boolean,
//     default: false,
//     required: [true, 'Please enter your status'],
//   },
//   renter: {
//     type: Boolean,
//     default: false,
//     required: [true, 'Please enter your status'],
//   },
//   website: {
//     type: String,
//   },
//   phone: {
//     type: String,
//     required: [true, 'Please enter your phone number'],
//   },
//   bio: {
//     type: String,
//     required: [true, 'Please enter a bio'],
//     minlength: [10, 'Minimum bio length is 10 characters'],
//   },
//   verified: {
//     type: Boolean,
//     default: false,
//   },
//   verified_doc_id: 
//   { type: mongoose.Schema.Types.ObjectId, 
//     ref: 'verified_doc',
//   },
//   agreement: {
//     type: Boolean,
//     default: false,
//     required: [true, 'Please check the agreement'],
//   },
//   created_at: { 
//     type: Date, 
//     default: Date.now 
//   },
// });

// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next(); // Skip hashing if the password is not modified (e.g., during update)
//     }
//     const salt = await bcrypt.genSalt(saltRounds); // Generate the salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
//     return next();
//   } catch (error) {
//     return next(error); // Call the next middleware with the error
//   }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);