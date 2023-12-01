const allContactsModule = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await allContactsModule.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await allContactsModule.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await allContactsModule.addContact(name, email, phone);
      return console.table(newContact);

    case "remove":
      const deleteContact = await allContactsModule.removeContact(id);
      return console.table(deleteContact);

    case "update":
      const updeteContact = await allContactsModule.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.table(updeteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

invokeAction(argv);
