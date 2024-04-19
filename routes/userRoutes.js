const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const authenticate = require('../middlewares/authenticate');

// Route to get user details by ID (requires authentication)
router.get('/:id', authenticate, userController.getUserById);

// Route to update user details (requires authentication)
router.put('/:id', authenticate, userController.updateUser);

// Route to delete a user account (requires authentication)
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
