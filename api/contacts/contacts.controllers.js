const contactMethods = require("./contacts.utils");

async function getContacts(req, res) {
  try {
    const contactsToSend = await contactMethods.listContacts();
    res.status(200).json(contactsToSend);
  } catch {
    res.status(500).json({ message: "Error witch server. Try later" });
  }
}
async function getContactByID(req, res) {
  try {
    const contactToSend = await contactMethods.getContactById(
      Number(req.params.contactId)
    );
    if (contactToSend) {
      res.status(200).json(contactToSend);
    }
    if (!contactToSend) {
     return res.status(404).json({ message: "User not found" });
    }
  } catch {
    res.status(500).json({ message: "Error witch server. Try later" });
  }
}

async function createContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactMethods.addContact(name, email, phone);
    res.status(200).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteContact(req, res) {
  try {
    const contactToSend = await contactMethods.getContactById(
      Number(req.params.contactId)
    );
    if (!contactToSend) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    await contactMethods.removeContact(Number(req.params.contactId));
    res.status(200).json({ message: "Contact is deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateContact(req, res) {
  try {
    const id = Number(req.params.contactId);
    const contactToSend = await contactMethods.getContactById(id);
    if (!contactToSend) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    await contactMethods.updateContact(id, req.body);
    res.status(200).json({ message: "contact modified", id: id });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
module.exports = {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact,
};
