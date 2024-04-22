const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); 


const createReservation = async (req, res) => {
    try {
        
        const { roomId, startTime, endTime } = req.body;
        const userId = req.user.id; 

        console.log('Room ID:', roomId);
        console.log('Request Body:', req.body);
        console.log('Received request:', req.body);

        

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const overlappingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (overlappingReservation) {
            return res.status(400).json({ error: 'Room is already reserved for the specified time period' });
        }

        const reservation = new Reservation({
            user: userId,
            room: roomId,
            startTime,
            endTime,
        });

        await reservation.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Reservation Confirmation',
            text: `You have reserved the room: ${room.name} from ${startTime} to ${endTime}.`,
        };

        await transporter.sendMail(mailOptions);

        res.render('reservationSuccess', {
            user,
            reservation,
            room,
            message: 'Reservation created successfully'
        });

    } catch (error) {
        console.error('Error creating reservation:', error);
        
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createReservation,
};
