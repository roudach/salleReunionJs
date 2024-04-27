const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1, 
    max: 1000,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'maintenance'],
    default: 'available',
  },
  
},{ timestamps: true }
);

roomSchema.index({ name: 1 });

roomSchema.virtual('roomId').get(function () {
  return this._id.toString();
});

roomSchema.virtual('isReserved').get(function () {
  return this.status === 'reserved';
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
