const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour l'inscription
router.post('/signup', authController.signup);

// Route pour la connexion
router.post('/login', authController.login);

// Autres routes d'authentification

module.exports = router;
