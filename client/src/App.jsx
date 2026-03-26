import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <ContactForm onAdd={handleAdd} />
      <ContactList key={refresh} />
    </div>
  );
}

export default App;