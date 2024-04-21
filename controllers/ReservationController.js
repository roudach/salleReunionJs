const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to create a reservation
const createReservation = async (req, res) => {
    try {
        // Extract roomId, startTime, and endTime from the request body
        const { roomId, startTime, endTime } = req.body;
        const userId = req.user.id;

        // Validate room and user
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);
        
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check for overlapping reservations
        const existingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        // Return error if the room is already reserved in the given time period
        if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved for the specified time period' });
        }

        // Create a new reservation
        const reservation = new Reservation({
            user: userId,
            room: roomId,
            startTime,
            endTime,
        });

        // Save the reservation to the database
        await reservation.save();

        // Configure email transporter using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define mail options for sending reservation confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Reservation Confirmation',
            text: `You have reserved the room: ${room.name} from ${startTime} to ${endTime}.`,
        };

        // Send the confirmation email
        await transporter.sendMail(mailOptions);

        // Send a success response with the created reservation
        res.status(201).json({ message: 'Reservation created successfully', reservation });

    } catch (error) {
        // Log the error for debugging
        console.error('Error creating reservation:', error);
        
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createReservation,
};
