const yargs = require("yargs");
const contacts = require("./src/contacts");

const argv = yargs
  .number("id")
  .string("action")
  .string("name")
  .string("email")
  .string("phone").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(contacts.listContacts());
      break;

    case "get":
      console.log(contacts.getContactById(id));
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
