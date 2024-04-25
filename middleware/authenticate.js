const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    try {
        console.log(req.body)
    const token = req.body.token;
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
