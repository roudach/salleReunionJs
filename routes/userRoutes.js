const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);


// Define routes for handling GET requests (serving login and register pages)
router.get('/login', (req, res) => {
    res.render('login'); // Serve the login.ejs template
});

router.get('/register', (req, res) => {
    res.render('register'); // Serve the register.ejs template
});


module.exports = router;
