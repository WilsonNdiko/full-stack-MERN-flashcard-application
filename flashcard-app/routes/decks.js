// routes/decks.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import our auth middleware
const Deck = require('../models/Deck'); // Import the Deck model
const Card = require('../models/Card'); 

// =================================================================
// @route   POST api/decks
// @desc    Create a new flashcard deck
// @access  Private (Requires authentication)
// =================================================================
router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;

  try {
    // 1. Create a new deck instance, linking it to the authenticated user ID
    // req.user.id is available because the 'auth' middleware adds it.
    const newDeck = new Deck({
      user: req.user.id,
      name,
      description,
    });

    // 2. Save the deck to the database
    const deck = await newDeck.save();

    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =================================================================
// @route   GET api/decks
// @desc    Get all decks for the logged-in user
// @access  Private
// =================================================================
router.get('/', auth, async (req, res) => {
  try {
    // Find all decks where the 'user' field matches the authenticated user's ID
    const decks = await Deck.find({ user: req.user.id }).sort({ date: -1 }); // Sort by newest first
    res.json(decks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =================================================================
// @route   PUT api/decks/:id
// @desc    Update a deck by ID
// @access  Private
// =================================================================
router.put('/:id', auth, async (req, res) => {
  const { name, description } = req.body;

  // Build a deckFields object based on what was sent in the request body
  const deckFields = {};
  if (name) deckFields.name = name;
  if (description) deckFields.description = description;

  try {
    let deck = await Deck.findById(req.params.id);

    // 1. Check if the deck exists
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });

    // 2. Check if the authenticated user owns the deck
    // Note: Mongoose stores 'user' as an ObjectId, so we convert it to a string for comparison.
    if (deck.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // 3. Update the deck
    deck = await Deck.findByIdAndUpdate(
      req.params.id,
      { $set: deckFields }, // Use $set to apply updates
      { new: true } // Return the updated document
    );

    res.json(deck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// routes/decks.js

// ...

// =================================================================
// @route   DELETE api/decks/:id
// @desc    Delete a deck by ID
// @access  Private
// =================================================================
router.delete('/:id', auth, async (req, res) => {
  try {
    let deck = await Deck.findById(req.params.id);

    // 1. Check if the deck exists
    if (!deck) return res.status(404).json({ msg: 'Deck not found' });

    // 2. Check user ownership (critical security step)
    if (deck.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // 3. Remove all associated cards first (The Data Integrity Fix)
    await Card.deleteMany({ deck: req.params.id }); 
    
    // 4. Remove the deck
    await Deck.findByIdAndDelete(req.params.id);
    

    res.json({ msg: 'Deck and all associated cards removed' }); // Update success message
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;