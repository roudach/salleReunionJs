const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for handling POST requests
router.post('/register', userController.register);
router.post('/login', userController.login);

// Define routes for handling GET requests (serving login and register pages)
router.get('/login', (req, res) => {
    res.render('login'); // Serve the login.ejs template
});

router.get('/register', (req, res) => {
    res.render('register'); // Serve the register.ejs template
});

// Define logout route
router.get('/logout', (req, res) => {
    // Check if req.logout is a function
    if (typeof req.logout === 'function') {
        req.logout((err) => {
            if (err) {
                console.error('Error during logout:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.redirect('/'); // Redirect to the home page after logout
            }
        });
    } else {
        console.error('Logout function not available');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
