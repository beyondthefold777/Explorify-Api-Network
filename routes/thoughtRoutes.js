const router = require('express').Router();
const { getThoughts, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', getThoughts);

// POST a new thought
router.post('/thoughts', createThought);

// PUT to update a thought by ID
router.put('/thoughts/:id', updateThought);

// DELETE to remove a thought by ID
router.delete('/thoughts/:id', deleteThought);

module.exports = router;
