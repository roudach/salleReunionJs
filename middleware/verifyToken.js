const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Function to verify the token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        // Verify the token using your secret key
        const decodedToken = jwt.verify(token, SECRET_KEY);

        // Attach the decoded token data to the request object
        req.user = decodedToken;

        // Proceed to the next middleware function
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyToken;
