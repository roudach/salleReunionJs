const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const createReservation = async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Validate room and user
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    if (!room || !user) {
      return res.status(404).json({ error: 'Room or user not found' });
    }

    // Create reservation
    const reservation = new Reservation({
      user: userId,
      room: roomId,
      startTime,
      endTime,
    });

    // Check for overlapping reservations
    await reservation.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({ /* email config here */ });
    const mailOptions = {
      from: 'noreply@reservation.com',
      to: user.email,
      subject: 'Reservation Confirmation',
      text: `You have reserved the room: ${room.name} from ${startTime} to ${endTime}.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
};
