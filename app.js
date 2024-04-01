const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configuration de la base de données MongoDB
const mongoURI = 'mongodb+srv://roudaynacherif9:roudayna.cherif@cluster0.gsxojr4.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Autres configurations et middleware

// Démarrez le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
