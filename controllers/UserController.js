const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Function to generate JWT token
const generateJwtToken = (user) => {
    const payload = {
        id: user._id,
        isAdmin: user.isAdmin,
    };

    const options = {
        expiresIn: '1h', // Set token expiration time
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Function to register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        // Create a new user
        const user = new User({
            username,
            email,
            password
        });

        // Save the user to the database
        await user.save();

        // Return a success response
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to handle user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateJwtToken(user);

        // Render the user dashboard EJS template
        res.render('dashboard', {
            user,
            token,
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
};
