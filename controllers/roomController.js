const Room = require('../models/Room');

const reserveRoom = async (req, res) => {
  try {

    const roomId = req.query.roomId;

      
      console.log('Received roomId:', roomId);

      
      const room = await Room.findById(roomId);
      if (!room) {
          return res.status(404).json({ error: 'Room not found' });
      }

      
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

const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;

        const room = await Room.findByIdAndDelete(roomId);

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Internal server error' });
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

const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.roomId; // Retrieve room ID from the request parameters
        
        // Find the room by ID
        const room = await Room.findById(roomId);
        
        // If the room is not found, respond with an error
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Return the room data as JSON
        res.status(200).json({ room });
    } catch (error) {
        console.error('Error finding room:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    reserveRoom,
    deleteRoom,
    getRoomById,
};
