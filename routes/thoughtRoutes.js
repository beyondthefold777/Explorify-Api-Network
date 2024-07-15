const router = require('express').Router();
const { getThoughts, createThought } = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', getThoughts);

// POST a new thought
router.post('/thoughts', createThought);

module.exports = router;
