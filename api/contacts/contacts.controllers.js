const Contacts = require("./contacts.model");

async function getContacts(req, res) {
  const { page = 1, limit = 5, sub } = req.query;
  const pagitnateOptions = {
    page,
    limit,
  };
  const queryOptions = sub ? { subscription: sub } : {};
  const contactsToSend = await Contacts.paginate(
    queryOptions,
    pagitnateOptions
  );

  if (!contactsToSend.docs.length)
    return res.status(400).json({ message: "Not found" });
  res.status(200).json(contactsToSend.docs);
}

async function getContactByID(req, res) {
  const contactToSend = await Contacts.findById(req.params.contactId);
  if (!contactToSend) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(contactToSend);
}

async function createContact(req, res) {
  const contactToCheck = await Contacts.findOne({ email: req.body.email });
  if (contactToCheck) {
    return res
      .status(409)
      .json({ message: "a user with this email is already exists" });
  }

  const newContact = await Contacts.create({ ...req.body });
  res.status(201).json(newContact);
}

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
