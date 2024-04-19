const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/Routes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://roudaynacherif9:roudayna.cherif@cluster0.gsxojr4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
