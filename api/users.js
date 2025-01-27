const express = require('express');
const router = express.Router();

// Import the controller that handles user registration
const usersController = require('../controllers/usersController');

// Route for user registration
router.post('/register', usersController.registerUser);

module.exports = router;
