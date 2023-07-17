import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
  
const contactsPath = path.resolve("models", "contacts.json");
const updateContactsList = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts () {
  const listContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(listContacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId)
    return contact || null;
}

async function updateContactById(contactId, { name, email, phone }) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId)
    if(index === -1){
        return null;
    }
    contacts[index] = {contactId, name, email, phone};
    await updateContactsList(contacts);
    return contacts[index];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
    const [result] = contacts.splice(index, 1);
    await updateContactsList(contacts);
    return result;
}

async function addContact({name, email, phone}) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
}


