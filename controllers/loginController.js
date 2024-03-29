require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


// @desc Get Login page
// @route GET /
const getLogin = (req, res) => {
  res.render("home");
};

// @desc Get Login page
// @route POST /
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "일치하는 사용자가 없습니다...!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다..."});
  }
  // 사용자 ID를 기반으로 JWT 토큰 생성
  console.log("ㅁ ", jwtSecret);
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/contacts");
});

// @desc Get Register page
// @route GET /register
const getRegister = (req, res) => {
  res.render("register");
};

// @desc Register user
// @route POST /register
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password === password2) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Register success", user: user });
    res.redirect("/");
  } else {
    res.send("비밀번호가 일치하지 않습니다.");
  }
});

// @desc Logout
// @route GET /logout
const logout = (req,res) => {
  res.clearCookie("token");
  res.redirect("/");
}

module.exports = { getLogin, loginUser, getRegister, registerUser, logout };
