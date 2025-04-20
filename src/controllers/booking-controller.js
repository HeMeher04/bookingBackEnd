const { Trip } = require("../models");
const mongoose = require("mongoose");
const { createBookingRepo , updateBookingStatus} = require("../utils");
const BOOKED = "booked";
const Booking = require("../models/booking");

const createBooking = async (req, res) => {
    const { tripId, userId, seatCount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const trip = await Trip.findById(tripId).session(session);
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        if (trip.availableSeats < seatCount) {
            return res.status(400).json({ error: "Not enough seats available" });
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
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Booking created successfully" ,data: booking});

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error while creating booking", details: err.message });
    }
};

const makePayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {bookingId, userId, totalCost} = req.body;
        const booking = await Booking.findById(bookingId).session(session);
        if(!booking){
            return res.status(404).json({ error: "BookingId not found" });
        }

        if(booking.status == 'cancelled'){
            return res.status(400).json({ error: "Booking expired" });
        }

        const bookingTime = new Date(booking.createdAt);
        const currentTime = new Date();
        if((currentTime - bookingTime) > 5 * 60 * 1000){
            return res.status(400).json({ error: "Booking expired" });
        }

        if(totalCost !== booking.totalCost){
            return res.status(400).json({ error: "Total cost mismatch" });
        }
        if(userId !== booking.user.toString()){
            return res.status(403).json({ error: "User mismatch" });
        }
        // Here you would integrate with a payment gateway to process the payment and assume payment is successful

        const finalBooking = await updateBookingStatus(bookingId, {status: BOOKED}, session);
        session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Payment successful", data: finalBooking });
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error while making payment", details: err.message });
    }
}
module.exports = { createBooking, makePayment };
