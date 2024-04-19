const Reservation = require('../models/ReservationSchema');
const Room = require('../models/RoomSchema');
const nodemailer = require('nodemailer');

const createReservation = async (req, res) => {
    try {
        const { room, date, startTime, endTime } = req.body;
        const user = req.user; // User is attached to the request after authentication

        // Check if room is available during the requested time
        const existingReservation = await Reservation.findOne({
            room,
            date,
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
        });

        if (existingReservation) {
            return res.status(400).json({ error: 'Room is already reserved at this time' });
        }

        // Create new reservation
        const reservation = new Reservation({ user: user._id, room, date, startTime, endTime, confirmed: false });
        await reservation.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Room Reservation Confirmation',
            text: `Your reservation for room ${room} on ${date.toISOString().split('T')[0]} from ${startTime} to ${endTime} has been confirmed.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        reservation.confirmed = true;
        await reservation.save();

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createReservation,
};
