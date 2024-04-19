const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ status: 'success', data: rooms });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/rooms/:id', roomController.updateRoom);


module.exports = router;
