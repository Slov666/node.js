const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  console.log(data);
}
// console.log(listContacts());

async function getContactById(contactId) {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  const parsedData = JSON.parse(data);
  const contactByID = parsedData.filter((contact) => contact.id === contactId);
  console.log(contactByID);
}
// console.log(getContactById(5));

async function removeContact(contactId) {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  const parsedData = JSON.parse(data);
  const delContactByID = parsedData.filter(
    (contact) => contact.id !== contactId
  );
  const stringifyData = JSON.stringify(delContactByID);
  await fsPromises.writeFile(contactsPath, stringifyData, (err) => {
    if (err) console.log(err);
  });
}

async function addContact(name, email, phone) {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  const parsedData = JSON.parse(data);
  const creacteContact = {
    id: parsedData.length + 1,
    name: name,
    email: email,
    phone: phone,
  };

  const updataContact = [...parsedData, creacteContact];
  const stringifyContact = JSON.stringify(updataContact);
  await fsPromises.writeFile(contactsPath, stringifyContact);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
