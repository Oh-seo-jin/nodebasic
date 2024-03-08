const express = require("express");
const dbConnect = require("./config/dbConnect")
const methodOverride = require("method-override");
// const errorhandler = require("./middlewares/errorhandler")

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(methodOverride("_method"));

const port = 3000;
dbConnect();

// app.get("/", (req, res) => {
//   res.send("hello node!");
// });

// 서버쪽에서 json 처리 가능하게 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // 

// routes
app.use("/", require("./routes/loginRoutes"))
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});