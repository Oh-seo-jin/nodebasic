const express = require("express");
const dbConnect = require("./config/dbConnect")
// const errorhandler = require("./middlewares/errorhandler")

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const port = 3000;

app.use(express.static("./public"));

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const resText = `Hello Node!\n요청시간: ${req.requestTime}`
  res.send(resText);
});

// routes
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});