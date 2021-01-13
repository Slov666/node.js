const { Router } = require("express");
const {
  addContactValidation,
  updateContactValidation,
} = require("./validationMiddleware");
const contactsRouter = Router();

const {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
} = require("./contacts.controllers");

contactsRouter.get("/", getContacts);
contactsRouter.get("/:contactId", getContactByID);
contactsRouter.post("/", addContactValidation, createContact);
contactsRouter.delete("/:contactId", deleteContact);
contactsRouter.patch("/:contactId", updateContactValidation, updateContact);

module.exports = contactsRouter;
