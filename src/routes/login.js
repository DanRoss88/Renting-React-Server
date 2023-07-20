const bcrypt = require('bcrypt');
const express = require('express');
const loginRouter = express.Router();

// Example route to display the login form
loginRouter.get('/', (req, res) => {
  // Render your login form HTML page or template here
  res.render('login-form'); // Replace 'login-form' with your actual HTML page or template
});


// Example route for user login
loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch the user's hashed password from the database based on the username
    // (this is just a placeholder, replace it with your database code)
    // Example database code:
    // const user = await User.findOne({ username });
    // const hashedPassword = user.password;

    // For demonstration purposes, let's assume we have a hardcoded hashed password
    const hashedPassword = '$2b$10$Vi8E/eEyn89zLBbPddXJHuWiKd7l6TkR24xHk8pr2mfs8g6txq.wO';

    // Compare the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (isPasswordCorrect) {
      // Passwords match, authentication successful
      res.status(200).json({ message: 'Login successful!' });
    } else {
      // Passwords don't match, authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = loginRouter;