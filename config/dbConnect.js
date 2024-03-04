const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_LOCAL_URL);
    console.log(`DB 연결됨!!`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = dbConnect;