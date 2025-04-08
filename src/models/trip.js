const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);


