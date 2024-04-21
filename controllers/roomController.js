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
    const rooms = await Room.find();
    res.render('rooms', { rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
};
