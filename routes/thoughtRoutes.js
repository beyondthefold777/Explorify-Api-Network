const router = require('express').Router();
const { getThoughts, createThought, updateThought, deleteThought } = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', getThoughts);

// POST a new thought
router.post('/thoughts', createThought);

// PUT to update a thought by its _id
router.put('/thoughts/:id', updateThought);

// DELETE to remove thought by its _id
router.delete('/thoughts/:id', deleteThought);

module.exports = router;
