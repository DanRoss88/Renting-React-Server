const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.user_profile = asyncHandler(async (req, res) => {
  res.send(`NOT IMPLEMENTED: User profile: ${req.params.id}`);
});

