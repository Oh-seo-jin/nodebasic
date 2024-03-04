const express = require("express");
const dbConnect = require("./config/dbConnect")
// const errorhandler = require("./middlewares/errorhandler")
const app = express();

const port = 3000;
dbConnect();

const requsetTime = (req, res, next) => {
  let today = new Date();
  let now = today.toLocaleTimeString();
  req.requestTime = now;
  next();
}

app.use(requsetTime);

app.get("/", (req, res) => {
  const resText = `Hello Node!\n요청시간: ${req.requestTime}`
  res.send(resText);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});