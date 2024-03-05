const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const {
  getAllContacts, 
  createContact, 
  getContact, 
  updateContact, 
  deleteContact,
} = require("../controllers/contactController");



router
  .route("/")
  // 모든 연락처 가져오기
  .get(getAllContacts)
  .post(createContact);

router
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
