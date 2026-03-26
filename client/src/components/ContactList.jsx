import React, { useEffect, useState } from 'react';
import API from '../api';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await API.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

useEffect(() => {
  const loadContacts = async () => {
    const res = await API.get('/contacts');
    setContacts(res.data);
  };

  loadContacts();
}, []);


  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts yet</p>
      ) : (
        contacts.map((c) => (
          <div key={c._id} className="contact">
        <span>
            {c.name} | {c.email} | {c.phone}
        </span>
        <button
            className="delete-btn"
            onClick={() => deleteContact(c._id)}
            >
            Delete
        </button>
    </div>
        ))
      )}
    </div>
  );
}

export default ContactList;