const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const authenticate = require('../middleware/AuthentificationMiddleware');
const authorizeAdmin = require('../middleware/AuthorizedMiddleware');

const mockData = require('../mockData'); // Importing the mock data
const rooms = mockData.rooms;

router.get('/', (req, res) => {
    res.render('rooms', { rooms });
});

// Route to create a new room (requires authentication and admin privileges)
router.post('/rooms', authenticate, authorizeAdmin, roomController.createRoom);

// Route to list all rooms (public)
router.get('/rooms', roomController.listRooms);

// Route to update a room by ID (requires authentication and admin privileges)
router.put('/rooms/:id', authenticate, authorizeAdmin, roomController.updateRoom);

// Route to delete a room by ID (requires authentication and admin privileges)
router.delete('/rooms/:id', authenticate, authorizeAdmin, roomController.deleteRoom);

module.exports = router;
