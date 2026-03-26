import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import API from './api';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await API.get('/contacts');
    setContacts(res.data);
  };

useEffect(() => {
  const loadContacts = async () => {
    const res = await API.get('/contacts');
    setContacts(res.data);
  };

  loadContacts();
}, []);

  const handleAdd = (newContact) => {
    setContacts((prev) => [...prev, newContact]); // ✅ instant update
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter(c => c._id !== id));
  };

  const handleUpdate = (updatedContact) => {
    setContacts((prev) =>
      prev.map(c => c._id === updatedContact._id ? updatedContact : c)
    );
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>

      <ContactForm onAdd={handleAdd} contacts={contacts} />

      <ContactList
        contacts={contacts}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;