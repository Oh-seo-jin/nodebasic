const express = require("express");
const router = express.Router();
const { getLogin, loginUser, getRegister, registerUser, logout } = require("../controllers/loginController.js");

router.route("/").get(getLogin).post(loginUser);
router.route("/register").get(getRegister).post(registerUser);
router.route("/logout").get(logout);

module.exports = router;
