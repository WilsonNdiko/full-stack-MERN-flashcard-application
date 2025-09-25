// client/src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth/AuthState';
import { useNavigate, Link } from 'react-router-dom';
import DeckForm from './DeckForm';

const API_URL = 'http://localhost:5000/api/decks';

const Dashboard = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleDeckCreated = (newDeck) => {
    setDecks([newDeck, ...decks]);
  };

  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/login');
    }
    if (isAuthenticated) {
      fetchDecks();
    }
  }, [isAuthenticated, loading, navigate]);

  const fetchDecks = async () => {
    try {
      const res = await axios.get(API_URL);
      setDecks(res.data);
      setDataLoading(false);
    } catch (err) {
      console.error('Failed to fetch decks:', err);
      setDataLoading(false);
    }
  };

  // 🗑️ Delete deck
  const onDeleteDeck = async (deckId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this deck and ALL its cards? This cannot be undone.'
      )
    ) {
      try {
        await axios.delete(`${API_URL}/${deckId}`);
        setDecks(decks.filter((deck) => deck._id !== deckId));
      } catch (err) {
        console.error('Failed to delete deck:', err.response?.data?.msg || err);
        alert('Deletion failed. Check authorization.');
      }
    }
  };

  if (loading || dataLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h2>My Flashcard Decks</h2>

      <button className="btn btn-primary mb-3" onClick={toggleForm}>
        + Create New Deck
      </button>

      {showForm && (
        <DeckForm onDeckCreated={handleDeckCreated} toggleForm={toggleForm} />
      )}

      {decks.length === 0 ? (
        <p>You haven't created any decks yet! Click the button above to start.</p>
      ) : (
        <div className="deck-list">
          {decks.map((deck) => (
            <div key={deck._id} className="deck-card">
              <h3>{deck.name}</h3>
              <p>{deck.description}</p>

              <div className="deck-actions mt-3">
                <Link
                  to={`/study/${deck._id}`}
                  className="btn btn-sm btn-secondary"
                >
                  Study Deck
                </Link>

                <Link
                  to={`/deck/${deck._id}`}
                  className="btn btn-sm btn-light ml-2"
                >
                  Manage Cards
                </Link>

                <button
                  onClick={() => onDeleteDeck(deck._id)}
                  className="btn btn-sm btn-danger"
                  style={{ float: 'right' }}
                >
                  Delete Deck
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
