const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
    },
    phone:{
      type: String,
      required: [true, "전화번호는 꼭! 기입해주세요."], // 오류 메시지
    },
  },
  {
    timestamps: true,
  }
);

// model은 다른 파일에서 데이터 넣고 뺄 때 사용
const Contact = mongoose.model("Contact", contactSchema, );

module.exports = Contact;