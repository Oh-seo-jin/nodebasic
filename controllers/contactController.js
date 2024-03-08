const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.status(200).render("getAll", {heading:"User List", contacts:contacts});
  res.render("index", { contacts: contacts });
});

// @desc view add contact form
// @route GET /contacts/add
const addContactForm = (req, res) => {
  res.render("add");
};

// @desc Create a contacts
// @route POST /contacts/add
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  }
  const contact = await Contact.create({ name, email, phone }); // return promise
  res.status(201).redirect("/contacts");
});

// @desc get a contacts
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // 연락처 상세보기
  const contact = await Contact.findById(req.params.id);
  res.status(200).render("update", {contact:contact});
});

// @desc put a contacts
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  // 연락처 수정하기
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  contact.save();
  res.status(200).redirect("/contacts");
});

// @desc delete a contacts
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  // 연락처 삭제하기
  const id = req.params.id;
  const contact = await Contact.findByIdAndDelete(id);
  res.status(200).redirect("/contacts");
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
};
