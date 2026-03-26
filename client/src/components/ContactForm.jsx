import React, { useState } from 'react';
import API from '../api';

function ContactForm({ onAdd, contacts = [] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '+91'
  });

  // 🇮🇳 Indian phone validation
  const validateIndianPhone = (phone) => {
    return /^\+91\d{10}$/.test(phone);
  };

  // 🚫 Check duplicates
  const isDuplicate = (phone) => {
    return contacts.some(c => c.phone === phone);
  };

  const isDuplicateName = (name) => {
  return contacts.some(c => c.name.toLowerCase() === name.toLowerCase());
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateIndianPhone(form.phone)) {
      alert('Enter valid Indian number (+91XXXXXXXXXX)');
      return;
    }

    if (isDuplicate(form.phone)) {
      alert('This number already exists');
      return;
    }

    if (isDuplicateName(form.name)) {
      alert('This name already exists');
     return;
    }

    try {
      const res = await API.post('/contacts', form);
      onAdd(res.data);

      // reset form (keep +91)
      setForm({ name: '', email: '', phone: '+91' });

    } catch (err) {
      console.error('Error adding contact:', err);
      alert('Failed to add contact');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        value={form.name}
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={form.email}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        value={form.phone}
        placeholder="Phone (+91XXXXXXXXXX)"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;