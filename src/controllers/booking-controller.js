const { Trip } = require("../models");
const mongoose = require("mongoose");
const { createBookingRepo , updateBookingStatus} = require("../utils");
const BOOKED = "booked";

const createBooking = async (req, res) => {
    const { tripId, userId, seatCount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const trip = await Trip.findById(tripId).session(session);
        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.availableSeats < seatCount) {
            throw new Error("Not enough seats available");
        }

        const totalCost = trip.price * seatCount;
        const bookingPayload = {
            trip: tripId,
            user: userId,
            noOfSeats: seatCount,
            totalCost: totalCost
        };
        
        const booking = await createBookingRepo(bookingPayload, session);
        trip.availableSeats -= seatCount;
        //trip.availableSeats="ki";   // check rollback
        await trip.save({ session });
        const finalBooking = await updateBookingStatus(booking._id, {status: BOOKED}, session);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Booking created successfully" ,data: finalBooking });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error while creating booking", details: err.message });
    }
};

module.exports = { createBooking };
