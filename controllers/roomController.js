const Room = require('../models/Room');

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
        res.json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRoom,
    listRooms,
};
