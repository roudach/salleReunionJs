const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    // Check for the Authorization header
    const authorizationHeader = req.headers.authorization;

    // Make sure the header exists and starts with "Bearer "
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        console.log('No token provided.');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the token from the header
    const token = authorizationHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('User authenticated:', decoded);
        req.user = decoded; // Store the decoded user information in the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authenticate;
