const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Function to create a reservation
const createReservation = async (req, res) => {
    try {
        // Extract roomId, startTime, and endTime from the request body
        const { roomId, startTime, endTime } = req.body;
        const userId = req.user.id; // Assuming req.user contains the logged-in user ID

        console.log('Room ID:', roomId);
        console.log('Request Body:', req.body);
        console.log('Received request:', req.body);

        

        // Validate room and user existence
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check for overlapping reservations
        const overlappingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        // If an overlapping reservation is found, return an error response
        if (overlappingReservation) {
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

        // Configure nodemailer transport for sending emails
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Reservation Confirmation',
            text: `You have reserved the room: ${room.name} from ${startTime} to ${endTime}.`,
        };

        // Send the reservation confirmation email
        await transporter.sendMail(mailOptions);

        // Send a success response with the reservation details
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
