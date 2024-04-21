const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

reservationSchema.pre('save', async function (next) {
  // Log the reservation being attempted to save
  console.log('Attempting to save reservation:', this);

  try {
    // Check for overlapping reservations
    const overlappingReservations = await Reservation.find({
      room: this.room,
      $or: [
        { startTime: { $lt: this.endTime, $gt: this.startTime } },
        { endTime: { $lt: this.endTime, $gt: this.startTime } },
      ],
    });

    // Log the result of overlapping reservations check
    console.log('Overlapping reservations found:', overlappingReservations);

    if (overlappingReservations.length > 0) {
      const error = new Error('The room is already reserved during the selected time period.');
      // Log the error message
      console.log('Error:', error.message);
      next(error);
    } else {
      next();
    }
  } catch (error) {
    // Log the error if any exception occurs
    console.error('Error in pre-save middleware:', error);
    next(error);
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
