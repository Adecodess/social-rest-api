const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const AuthController = require("../controllers/authController");

router.post(
  "/register",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "A valid password is required").exists(),
  ],

  AuthController.registerNewUser
);

router.post(
  "/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "A valid password is required").exists(),
  ],

  AuthController.loginUser
);

module.exports = router;
