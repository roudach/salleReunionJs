const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');

router.post('/room', isAdmin, roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);

module.exports = router;
