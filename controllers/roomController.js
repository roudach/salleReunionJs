const Room = require('../models/room');

exports.createRoom = async (req, res) => {
  try {
    const { name, capacity, amenities } = req.body;
    const newRoom = await Room.create({ name, capacity, amenities });
    res.status(201).json({ status: 'success', data: newRoom });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};




exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id; 
    const { name, capacity, amenities } = req.body; 
    const updatedRoom = await Room.findOneAndUpdate({ _id: roomId }, { name, capacity, amenities }, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ status: 'error', message: 'Salle de réunion non trouvée' });
    }
    res.json({ status: 'success', data: updatedRoom });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
