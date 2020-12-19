const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const parsedData = await listContacts();
  const contactByID = parsedData.find((contact) => contact.id === contactId);
  console.log(contactByID);
}

async function removeContact(contactId) {
  const parsedData = await listContacts();
  const delContactByID = parsedData.filter(
    (contact) => contact.id !== contactId
  );
  const stringifyData = JSON.stringify(delContactByID);
  await fsPromises.writeFile(contactsPath, stringifyData, (err) => {
    if (err) console.log(err);
  });
}
// removeContact()
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
  };

  const updataContact = [...parsedData, creacteContact];
  const stringifyContact = JSON.stringify(updataContact);
  await fsPromises.writeFile(contactsPath, stringifyContact);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
