const router = require('express').Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

// GET all users
router.get('/users', getUsers);

// POST a new user
router.post('/users', createUser);

// PUT to update a user by its _id
router.put('/users/:id', updateUser);

// DELETE to remove user by its _id
router.delete('/users/:id', deleteUser);

module.exports = router;
