const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((contact) => contact.id === contactId);
  return oneContact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const findContact = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (findContact === -1) {
    return null;
  }
  const [result] = allContacts.splice(findContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

async function updateContact(contactId, data) {
  const allContacts = await listContacts();
  const findContact = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (findContact === -1) {
    return null;
  }
  allContacts[findContact] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[findContact];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
