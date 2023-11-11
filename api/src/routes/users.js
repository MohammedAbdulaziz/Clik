const express = require("express");
const router = express.Router();
const authController = require("../controllers/authenticationController");
const authMiddleware = require("../middlewares/authMiddleWare");
const customerController = require("../controllers/customerController");

// POST /users/register
router.post("/signup", authController.signup);

// POST /users/login
router.post("/login", authController.login);

// GET /users/logout
router.get("/logout", authMiddleware, authController.logout);

// GET /users/profile
router.get("/profile", authMiddleware, customerController.getProfile);

// PUT /users/profile
router.put("/profile", authMiddleware, customerController.editProfile);

module.exports = router;
