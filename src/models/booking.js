const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
//   bookedSeats: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Seat",
//     required: true
//   }],
  noOfSeats: {
    type: Number,
    default: 1,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "initiated", "pending"],
    default: "initiated"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
