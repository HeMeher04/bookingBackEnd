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
    fromCityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stations",
        required: true
    },
    toCityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
    },
    departureDateAndTime: {
        type: Date,
        required: true
    },
    arrivalDateAndTime: {
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


