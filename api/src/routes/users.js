const express = require('express');
const router = express.Router();
const authController = require('../controllers/authenticationController');
const customerController = require('../controllers/customerController');

// POST /users/register
router.post('/signup', authController.signup);

// POST /users/login
router.post('/login', authController.login);

// GET /users/logout
router.get('/logout', authController.isAuthenticated, authController.logout);

// GET /users/profile
router.get('/profile', authController.isAuthenticated, customerController.getProfile);

// PUT /users/profile
router.put('/profile', authController.isAuthenticated, customerController.editProfile);

module.exports = router;

