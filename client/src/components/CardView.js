// client/src/components/CardView.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth/AuthState';

const API_CARD_URL = 'http://localhost:5000/api/cards';
const API_DECK_URL = 'http://localhost:5000/api/decks';

const CardView = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { deckId } = useParams(); // Get the deckId from the URL parameter

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCard, setNewCard] = useState({ front: '', back: '' });

  // --- 1. Fetch Deck and Cards on Load ---
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchDeckAndCards = async () => {
      try {
        // Fetch deck details (we'll expand this to fetch deck by ID later)
        // For now, let's just fetch the cards.
        
        // OPTIONAL: You could fetch the specific deck details here using a GET /api/decks/:deckId route if you created one.
        
        // Fetch Cards
        const cardRes = await axios.get(`${API_CARD_URL}/${deckId}`);
        setCards(cardRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cards:', err);
        setLoading(false);
        // If the ID is bad or user is unauthorized
        navigate('/dashboard'); 
      }
    };

    fetchDeckAndCards();
  }, [deckId, isAuthenticated, navigate]);

  // --- 2. Handle New Card Form ---
  const onChange = (e) => setNewCard({ ...newCard, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to the API_CARD_URL/:deckId endpoint
      const res = await axios.post(`${API_CARD_URL}/${deckId}`, newCard);
      
      // Add the new card to the local state list and clear the form
      setCards([...cards, res.data]); 
      setNewCard({ front: '', back: '' }); 
    } catch (err) {
      console.error('Failed to create card:', err.response.data.msg);
    }
  };
  
  // --- 3. Handle Card Deletion ---
  const onDeleteCard = async (cardId) => {
    try {
      await axios.delete(`${API_CARD_URL}/${cardId}`);
      // Filter the deleted card out of the state
      setCards(cards.filter(card => card._id !== cardId)); 
    } catch (err) {
      console.error('Failed to delete card:', err.response.data.msg);
    }
  }


  if (loading) return <h2>Loading cards...</h2>;

  return (
    <div className='card-view-container'>
      <button onClick={() => navigate('/dashboard')} className='btn btn-light mb-4'>
        &larr; Back to Decks
      </button>
      
      {/* CARD ADDITION FORM */}
      <div className='card-form card p-4 mb-4'>
        <h3>Add New Card</h3>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='front'
            placeholder='Front (Question/Term)'
            value={newCard.front}
            onChange={onChange}
            required
            className='mb-2'
          />
          <textarea
            name='back'
            placeholder='Back (Answer/Definition)'
            value={newCard.back}
            onChange={onChange}
            required
            className='mb-2'
          ></textarea>
          <button type='submit' className='btn btn-success btn-sm'>
            Save Card
          </button>
        </form>
      </div>

      {/* CARD LIST */}
      <div className='card-list'>
        {cards.length === 0 ? (
          <p>This deck has no cards yet. Add one above!</p>
        ) : (
          cards.map((card) => (
            <div key={card._id} className='card p-3 mb-3'>
              <div className='card-content'>
                <strong>Front:</strong> {card.front}
                <br />
                <strong>Back:</strong> {card.back}
              </div>
              <button 
                  onClick={() => onDeleteCard(card._id)}
                  className='btn btn-danger btn-sm'
                  style={{float: 'right'}}>
                  Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardView;