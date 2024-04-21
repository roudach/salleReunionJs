const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        // Extract name, email, and password from the request body
        const { name, email, password } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Send a response with the created user (excluding password)
        res.status(201).json({ user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error registering user:', error);
        res.status(400).json({ error: error.message });
    }
};

// Function to log in an existing user
const loginUser = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token for the user
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token as a response
        res.json({ token });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error logging in user:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
