const Contacts = require("./contacts.model");

async function getContacts(req, res) {
  const contactsToSend = await Contacts.find({});
  if (!contactsToSend) return res.status(400).json({ message: "Not found" });
  res.status(200).json(contactsToSend);
}
async function getContactByID(req, res) {
  const contactToSend = await Contacts.findById(req.params.contactId);
  if (!contactToSend) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(contactToSend);
}

async function createContact(req, res) {
  const contactToCheck = await Contacts.findOne({ ...req.body });
  if (contactToCheck) {
    return res
      .status(409)
      .json({ message: "a user with this email is already exists" });
  }
  const newContact = await Contacts.create({ ...req.body });
  res.status(201).json(newContact);
}

// async function createContact(req, res, next) {
//   try {
//     const contact = await Contacts.create({ ...req.body });
//     return res.status(201).send(contact);
//   } catch (error) {
//     next(error);
//   }
// }

async function deleteContact(req, res) {
  const id = req.params.contactId;
  const contactToSend = await Contacts.findById(req.params.contactId);
  if (!contactToSend) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  await Contacts.findByIdAndDelete(id);
  res.status(200).json({ message: "Contact is deleted!" });
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const contactToSend = await Contacts.findById(req.params.contactId);
  if (!contactToSend) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }
  await Contacts.findByIdAndUpdate(id, { $set: req.body });
  res.status(200).json({ message: "contact modified", id: id });
}
module.exports = {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
};
