const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({}) // Finds all documents in the Thought collection
      .populate({ path: 'reactions', select: '-__v' }) 
      .select('-__v') 
      .then((thoughts) => res.json(thoughts)) // Sends the thoughts as a JSON response
      .catch((err) => {
        console.log(err); 
        res.status(500).json(err); 
      });
  },

  // Get one thought by ID
  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.id }) // Finds one document in the Thought collection by ID
      .populate({ path: 'reactions', select: '-__v' }) 
      .select('-__v') 
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this ID' }); 
          return;
        }
        res.json(thought); 
      })
      .catch((err) => {
        console.log(err); 
        res.status(400).json(err); 
      });
  },

  // Create new thought
  newThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId }, // Finds the user by ID
          { $push: { thoughts: _id } }, // Adds the new thought's ID to the user's thoughts array
          { new: true } // Returns the updated user document
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(user); 
      })
      .catch((err) => res.json(err)); 
  },

  // Update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true, 
    })
      .populate({ path: 'reactions', select: '-__v' }) // Populates the reactions field
      .select('-__v') 
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this ID' }); // Sends a 404 status code if no thought is found
          return;
        }
        res.json(thought); 
      })
      .catch((err) => res.json(err)); 
  },

  // Delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }) // Finds and deletes a document in the Thought collection by ID
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this ID' }); 
        }
        res.json(thought); 
      })
      .catch((err) => res.status(400).json(err)); // Sends a 400 status code and the error as a JSON response
  },

  // Add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, // Finds the thought by ID
      { $addToSet: { reactions: body } }, // Adds the reaction to the thought's reactions array if it doesn't already exist
      { new: true, runValidators: true } // Returns the updated document and runs validators on the update operation
    )
      .populate({ path: 'reactions', select: '-__v' }) // Populates the reactions field, excluding the __v field
      .select('-__v') // Excludes the __v field from the returned document
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this ID' }); // Sends a 404 status code if no thought is found
          return;
        }
        res.json(thought); // Sends the updated thought as a JSON response
      })
      .catch((err) => res.json(err)); // Sends the error as a JSON response
  },

  // Remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, // Finds the thought by ID
      { $pull: { reactions: { reactionId: params.reactionId } } }, // Removes the reaction from the thought's reactions array
      { new: true } // Returns the updated document
    )
      .then((thought) => res.json(thought)) 
      .catch((err) => res.json(err)); 
  },
};
