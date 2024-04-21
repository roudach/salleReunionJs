const Room = require('../models/Room');

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
      const rooms = await Room.find(); // Fetch all rooms from the database
      res.render('rooms', { rooms }); // Render the rooms view and pass the rooms data
  } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
};
