const Room = require('../models/Room');

const reserveRoom = async (req, res) => {
  try {
      // Retrieve room ID from request query or body
      const roomId = req.query.roomId;

      // Log the received room ID for debugging
      console.log('Received roomId:', roomId);

      // Fetch the room details from the database
      const room = await Room.findById(roomId);
      if (!room) {
          return res.status(404).json({ error: 'Room not found' });
      }

      // Render the 'reservation' view and pass the room details
      res.render('reservation', { roomId: room._id, roomName: room.name });
  } catch (error) {
      console.error('Error handling room reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


const createRoom = async (req, res) => {
    try {
        const { name, capacity, description } = req.body;
        const newRoom = new Room({ name, capacity, description });
        await newRoom.save();
        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.render('room', { rooms });
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    reserveRoom,
};
