import React, { useState } from 'react';
import API from '../api';

function ContactForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/contacts', form);
    onAdd(res.data);

    setForm({ name: '', email: '', phone: '' }); // clear form
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
            placeholder="Phone"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;