const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const authenticate = require('../middleware/AuthentificationMiddleware'); // Correcting potential typo

// Route to get user details by ID (requires authentication)
router.get('/:id', authenticate, (req, res) => {
    // Call the getUserById function from the userController
    // Make sure userController.getUserById exists
    userController.getUserById(req, res);
});

// Route to update user details (requires authentication)
router.put('/:id', authenticate, (req, res) => {
    // Call the updateUser function from the userController
    // Make sure userController.updateUser exists
    userController.updateUser(req, res);
});

// Route to delete a user account (requires authentication)
router.delete('/:id', authenticate, (req, res) => {
    // Call the deleteUser function from the userController
    // Make sure userController.deleteUser exists
    userController.deleteUser(req, res);
});

module.exports = router;
