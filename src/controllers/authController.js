const User = require("../models/user");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcrypt");

module.exports.Register = async (req, res, next) => {
  try {
    const {
      full_name,
      location,
      renter,
      owner,
      email,
      password,
      username,
      website,
      bio,
      phone,
      verified,
      verified_doc,
      agreement,
      createdAt,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ 
      full_name,
      location,
      renter,
      owner,
      email,
      password,
      username,
      website,
      bio,
      phone,
      verified,
      verified_doc,
      agreement,
      createdAt });
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const {username, password } = req.body;
      if(!username || !password) {
        return res.status(400).json({ message: "Please enter all required fields" });
      }
      const user = await User.findOne({ username });
      if(!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const auth = await bcrypt.compare(password, user.password);
      if(!auth) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(200).json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
    };
