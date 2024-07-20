const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', getAllThoughts);

// GET one thought by ID
router.get('/thoughts/:id', getOneThought);

// POST a new thought
router.post('/thoughts/:userId', newThought);

// PUT to update a thought by ID
router.put('/thoughts/:id', updateThought);

// DELETE to remove a thought by ID
router.delete('/thoughts/:id', deleteThought);

// POST to add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', addReaction);

// DELETE to remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
