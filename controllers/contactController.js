const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc get all contacts
// @route GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  console.log(typeof(contacts));
  res.status(200).render("getAll", {heading:"User List", contacts:contacts});
});

// @desc Create a contacts
// @route POST /contacts
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  }
  const contact = await Contact.create({name, email, phone});  // return promise
  res.status(201).send("Create Contacts");
});

// @desc get a contacts
// @route GET /contacts/:id
const getContact = asyncHandler(async(req, res) => {
  // 연락처 상세보기
  const contact = await Contact.findById(req.params.id);
  res.status(200).send(contact);
})

// @desc put a contacts
// @route PUT /contacts/:id
const updateContact = asyncHandler(async(req, res) => {
  // 연락처 수정하기
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
    );
    res.status(200).send(updatedContact);
  })

// @desc delete a contacts
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async(req, res) => {
  // 연락처 삭제하기
  const id = req.params.id;
  const contact = await Contact.findByIdAndDelete(id);
  res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
})

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
