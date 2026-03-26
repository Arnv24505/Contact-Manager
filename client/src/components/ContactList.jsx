import React, { useState } from 'react';
import API from '../api';

function ContactList({ contacts, onDelete, onUpdate }) {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // 🔍 Filter contacts
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  // ❌ Delete
  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      onDelete(id); // ✅ instant update
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // ✏️ Start edit
  const startEdit = (contact) => {
    setEditingId(contact._id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  };

  // 💾 Save edit
  const updateContact = async (id) => {
    try {
      const res = await API.put(`/contacts/${id}`, editForm);
      setEditingId(null);
      onUpdate(res.data); // ✅ instant update
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>

      {/* 🔍 Search Bar */}
      <input
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: '15px',
          width: '100%',
          padding: '8px'
        }}
      />

      {/* 📋 Contact List */}
      {filteredContacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        filteredContacts.map((c) => (
          <div key={c._id} className="contact-card">

            {editingId === c._id ? (
              <>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <input
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />

                <button onClick={() => updateContact(c._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="contact-info">
                  <strong>{c.name}</strong>
                  <p>{c.email}</p>
                  <p>{c.phone}</p>
                </div>

                <div className="actions">
                  <button onClick={() => startEdit(c)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;