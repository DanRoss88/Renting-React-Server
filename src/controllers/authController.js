// const User = require("../models/user");
// const { createSecretToken } = require("../util/secretToken");
// const bcrypt = require("bcrypt");

// module.exports.Register = async (req, res, next) => {
//   try {
//     const {
//       full_name,
//       location,
//       renter,
//       owner,
//       email,
//       password,
//       username,
//       website,
//       bio,
//       phone,
//       verified,
//       verified_doc,
//       agreement,
//       createdAt,
//     } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }
//     const user = await User.create({
//       full_name,
//       location,
//       renter,
//       owner,
//       email,
//       password,
//       username,
//       website,
//       bio,
//       phone,
//       verified,
//       verified_doc,
//       agreement,
//       createdAt });
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res
//       .status(201)
//       .json({ message: "User signed in successfully", success: true, user });
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports.Login = async (req, res, next) => {
//     try {
//       const {username, password } = req.body;
//       if(!username || !password) {
//         return res.status(400).json({ message: "Please enter all required fields" });
//       }
//       const user = await User.findOne({ username });
//       if(!user) {
//         return res.status(400).json({ message: "User does not exist" });
//       }
//       const auth = await bcrypt.compare(password, user.password);
//       if(!auth) {
//         return res.status(400).json({ message: "Incorrect password" });
//       }
//       const token = createSecretToken(user._id);
//       res.cookie("token", token, {
//         withCredentials: true,
//         httpOnly: false,
//       });
//       res.status(200).json({ message: "User signed in successfully", success: true, user });
//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//     };

const User = require("../models/user");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.Register = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      withCredentials: true,
      httpOnly: false,
      expires: new Date(0),
    });
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};


