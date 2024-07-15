const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/userController');

// GET all users
router.get('/users', getUsers);

// POST a new user
router.post('/users', createUser);

module.exports = router;
