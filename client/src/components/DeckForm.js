// client/src/components/DeckForm.js

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/decks';

const DeckForm = ({ onDeckCreated, toggleForm }) => {
  const [deck, setDeck] = useState({
    name: '',
    description: '',
  });

  const { name, description } = deck;

  // Handles updates to the form input fields
  const onChange = (e) => setDeck({ ...deck, [e.target.name]: e.target.value });

  // Handles form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Axios sends the POST request. The x-auth-token is already set globally in AuthState.
      const res = await axios.post(API_URL, deck);
      
      // 1. Call the callback function provided by the parent (Dashboard)
      onDeckCreated(res.data); 
      
      // 2. Clear the form fields
      setDeck({ name: '', description: '' });
      
      // 3. Hide the form
      toggleForm(); 

    } catch (err) {
      // Handle errors (e.g., show a message if the server rejects the request)
      console.error('Deck creation failed:', err.response.data.msg);
    }
  };

  return (
    <div className='form-container card p-4 mb-4'>
      <h3>Create New Deck</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Deck Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description (Optional)</label>
          <textarea
            name='description'
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className='form-group d-flex justify-content-between'>
          <button type='submit' className='btn btn-success'>
            Save Deck
          </button>
          <button type='button' className='btn btn-light' onClick={toggleForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckForm;