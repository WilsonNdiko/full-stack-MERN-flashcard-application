// routes/cards.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Deck = require('../models/Deck');
const Card = require('../models/Card'); // Import the Card model

// =================================================================
// @route   POST api/cards/:deckId
// @desc    Add a new card to a specific deck
// @access  Private
// =================================================================
router.post('/:deckId', auth, async (req, res) => {
  const { front, back } = req.body;
  const deckId = req.params.deckId;

  try {
    // 1. Check if the deck exists and belongs to the authenticated user
    const deck = await Deck.findById(deckId);

    if (!deck) {
      return res.status(404).json({ msg: 'Deck not found' });
    }

    if (deck.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to add cards to this deck' });
    }

    // 2. Create a new card instance, linking it to the deck ID
    const newCard = new Card({
      deck: deckId,
      front,
      back,
    });

    // 3. Save the card to the database
    const card = await newCard.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =================================================================
// @route   GET api/cards/:deckId
// @desc    Get all cards for a specific deck
// @access  Private
// =================================================================
router.get('/:deckId', auth, async (req, res) => {
  try {
    const deckId = req.params.deckId;

    // 1. First, verify the deck exists and belongs to the user
    const deck = await Deck.findOne({ _id: deckId, user: req.user.id });

    if (!deck) {
      return res.status(404).json({ msg: 'Deck not found or you do not own it' });
    }

    // 2. Find all cards linked to that deck ID
    const cards = await Card.find({ deck: deckId }).sort({ date: 1 }); // Sort by creation date
    
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =================================================================
// @route   DELETE api/cards/:cardId
// @desc    Delete a card by ID (with ownership check)
// @access  Private
// =================================================================
router.delete('/:cardId', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // To ensure the user can delete it, we must check that they own the card's deck.
    const deck = await Deck.findById(card.deck);

    if (!deck || deck.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this card' });
    }

    // Delete the card
    await Card.findByIdAndDelete(req.params.cardId);

    res.json({ msg: 'Card removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// NOTE: We are skipping the PUT/Update card route for brevity but it would follow the same pattern as Deck update.

module.exports = router;