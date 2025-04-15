const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    row: {
        type: Number,
        required: true,
    },
    col: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['seat', 'sleeper'],
        default: 'seat',
    },
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;