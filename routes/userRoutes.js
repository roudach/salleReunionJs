const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


router.post('/register', userController.register);
router.post('/login', userController.login);


router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/register', (req, res) => {
    res.render('register'); 
});


router.get('/logout', (req, res) => {
    
    if (typeof req.logout === 'function') {
        req.logout((err) => {
            if (err) {
                console.error('Error during logout:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.redirect('/'); 
            }
        });
    } else {
        console.error('Logout function not available');
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
