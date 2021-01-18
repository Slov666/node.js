const { Router } = require("express");
const { asyncWrapper } = require("../helpers/helpers");
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

contactsRouter.get("/", asyncWrapper(getContacts));
contactsRouter.get("/:contactId", asyncWrapper(getContactByID));
contactsRouter.post("/", addContactValidation, asyncWrapper(createContact));
contactsRouter.delete("/:contactId", asyncWrapper(deleteContact));
contactsRouter.patch(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContact)
);

module.exports = contactsRouter;
