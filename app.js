const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejsLayouts = require('express-ejs-layouts');

const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './views/layouts/layout');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'your-mongo-uri')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Use room routes
app.use('/api/rooms', roomRoutes);

// Use user routes
app.use('/api/users', userRoutes);

// Define a route to display rooms
app.get('/rooms', (req, res) => {
    res.render('rooms');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
