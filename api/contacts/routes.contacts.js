const { Router } = require("express");
const { asyncWrapper } = require("../helpers");
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
} = require("./controllers.contacts");

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
