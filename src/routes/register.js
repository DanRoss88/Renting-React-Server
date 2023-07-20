const bcrypt = require('bcrypt');
const express = require('express');
const registerRouter = express.Router();



// Example route to display the registration form
registerRouter.get('/', (req, res) => {
  // Render your registration form HTML page or template here
  res.render('register-form'); // Replace 'register-form' with your actual HTML page or template
});


// Example route for user registration
registerRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Generate a salt with the specified number of rounds
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the username and hashed password to your database
    // (this is just a placeholder, replace it with your database code)
    // Example database code:
    // await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = registerRouter;