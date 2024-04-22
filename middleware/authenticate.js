const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        console.log('No token provided.');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('User authenticated:', decoded);
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authenticate;
