const { Thought } = require('../models');

// Controller to get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Controller to create a new thought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Controller to update a thought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Controller to delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getThoughts, createThought, updateThought, deleteThought };
