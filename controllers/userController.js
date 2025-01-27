const userService = require('../services/userService');
const { validationResult } = require('express-validator');

// Controller function to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service to create a user with Supabase
    const newUser = await userService.createUser({ username, email, password });

    res.status(201).json({
      message: 'User registered successfully!',
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser };
