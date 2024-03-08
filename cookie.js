const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
app.use(cookieParser());

app.get("/", (req, res) => {
  // create cookie(key, value, option)
  res.cookie("kai", "1234", {httpOnly:true});
  res.send("create cookie");
});

app.get("/cookie", (req, res) => {
  console.log(req.cookies.kai);
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("kai");
  res.send("delete cookie")
});

app.listen(port, () => {
  console.log("서버 시작!");
});