const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../../db/contacts.json");

function reWriteFile(newData) {
  fsPromises.writeFile(contactsPath, JSON.stringify(newData));
}

async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const parsedData = await listContacts();
  const contactByID = parsedData.find((contact) => contact.id === contactId);

  return contactByID;
}

async function removeContact(contactId) {
  const parsedData = await listContacts();
  const data = parsedData.filter((contact) => contact.id !== contactId);
  reWriteFile(data);
  return data;
}

async function addContact(name, email, phone) {
  const parsedData = await listContacts();
  let maxID = 0;
  parsedData.map((item) => {
    if (item.id > maxID) maxID = item.id;
  });
  const creacteContact = {
    id: maxID + 1,
    name: name,
    email: email,
    phone: phone,
  }

  const updataContacts = [...parsedData, creacteContact];
  reWriteFile(updataContacts)
  return creacteContact
}

async function updateContact(id, fildToUpdate) {
  let contact = null;
  const parsedData = await listContacts();
  const newContact = parsedData.map((item) => {
    if (item.id === id) {
      contact = { ...item, ...fildToUpdate };
      return contact;
    }
    return item;
  });
  reWriteFile(newContact);
  return contact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
