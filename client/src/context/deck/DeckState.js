// client/src/context/deck/DeckState.js

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 1. Create the Context
export const DeckContext = createContext();

// Set the API base URL for deck operations
const API_URL = 'http://localhost:5000/api/decks';

// 2. Create the Provider Component
export const DeckProvider = ({ children }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all decks for the logged-in user
  const getDecks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios automatically includes the x-auth-token set in AuthState.js
      const res = await axios.get(API_URL);
      setDecks(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError('Failed to fetch decks.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new deck
  const addDeck = async (deckData) => {
    try {
      const res = await axios.post(API_URL, deckData);
      // Add the new deck to the current state list
      setDecks([res.data, ...decks]);
    } catch (err) {
      console.error(err.response.data.msg);
      setError('Failed to add deck.');
    }
  };

  // Delete a deck
  const deleteDeck = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Filter out the deleted deck from the current state
      setDecks(decks.filter(deck => deck._id !== id));
    } catch (err) {
      console.error(err.response.data.msg);
      setError('Failed to delete deck.');
    }
  };

  const deckContextValue = {
    decks,
    loading,
    error,
    getDecks,
    addDeck,
    deleteDeck,
  };

  return (
    <DeckContext.Provider value={deckContextValue}>
      {children}
    </DeckContext.Provider>
  );
};