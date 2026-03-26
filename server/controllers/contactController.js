const Contact = require('../models/Contact');

// Create
exports.createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

// Read
exports.getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

// Update
exports.updateContact = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Delete
exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};