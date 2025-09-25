// client/src/components/Study.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth/AuthState';

const API_CARD_URL = 'http://localhost:5000/api/cards';

const Study = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { deckId } = useParams();

  // State for the card data
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for the study session
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  // --- 1. Fetch Cards on Load ---
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchCards = async () => {
      try {
        const cardRes = await axios.get(`${API_CARD_URL}/${deckId}`);
        setCards(cardRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cards:', err);
        setLoading(false);
        // Navigate back to dashboard if fetching fails (e.g., bad ID)
        navigate('/dashboard'); 
      }
    };

    fetchCards();
  }, [deckId, isAuthenticated, navigate]);
  
  // --- 2. Session Handlers ---
  
  // Function to move to the next card
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); // Flip back to the front for the new card
    } else {
      setSessionComplete(true); // End of the deck
    }
  };
  
  // Get the current card object
  const currentCard = cards[currentCardIndex];
  
  // --- 3. Render Logic ---

  if (loading) return <h2 className='text-center'>Loading study session...</h2>;
  
  if (cards.length === 0) {
      return (
          <div className='text-center'>
              <h2>Deck Empty</h2>
              <p>Go back and add some cards to this deck!</p>
              <button onClick={() => navigate(`/deck/${deckId}`)} className='btn btn-primary'>
                  Manage Cards
              </button>
          </div>
      );
  }

  if (sessionComplete) {
    return (
      <div className='text-center'>
        <h2>Study Session Complete! 🎉</h2>
        <p>You reviewed {cards.length} cards.</p>
        <button onClick={() => setSessionComplete(false) || setCurrentCardIndex(0)} className='btn btn-success mr-2'>
          Start Over
        </button>
        <button onClick={() => navigate('/dashboard')} className='btn btn-light'>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Main Card View
  return (
    <div className='study-container text-center'>
      <button onClick={() => navigate(`/deck/${deckId}`)} className='btn btn-light mb-4'>
        &larr; Back to Card Manager
      </button>

      {/* Card Counter */}
      <p className='text-muted'>Card {currentCardIndex + 1} of {cards.length}</p>

      {/* The Flashcard */}
      <div 
        className={`flashcard card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)} // Click to flip
      >
        <div className='card-body'>
          <h4 className='card-text'>
            {isFlipped ? currentCard.back : currentCard.front}
          </h4>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='study-actions mt-4'>
        <button onClick={() => setIsFlipped(true)} className='btn btn-secondary mr-2' disabled={isFlipped}>
          Show Answer
        </button>
        <button onClick={nextCard} className='btn btn-primary'>
          {currentCardIndex === cards.length - 1 ? 'Finish Session' : 'Next Card'}
        </button>
      </div>
    </div>
  );
};

export default Study;