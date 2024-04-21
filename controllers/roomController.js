const Room = require('../models/RoomSchema');

const createRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;
        const room = new Room({ name, capacity });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const listRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const updates = req.body;

        // Find the room by ID and update it with the provided updates
        const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, { new: true });

        // Check if the room was found and updated
        if (!updatedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Return the updated room details
        res.json(updatedRoom);
    } catch (error) {
        // Handle any errors
        res.status(400).json({ error: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;

        // Find the room by ID and delete it
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        // Check if the room was found and deleted
        if (!deletedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Return a success message
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        // Handle any errors
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRoom,
    listRooms,
    updateRoom,
    deleteRoom,
};
