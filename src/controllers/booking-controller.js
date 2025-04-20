const { Trip } = require("../models");
const mongoose = require("mongoose");
const { createBookingRepo, updateBookingStatus, abortAndReturn } = require("../utils");
const Booking = require("../models/booking");

const BOOKED = "booked";
const CANCELLED = "cancelled";

const createBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { tripId, userId, seatCount } = req.body;

        const trip = await Trip.findById(tripId).session(session);
        if (!trip) return abortAndReturn(session, res, 404, { error: "Trip not found" });

        if (trip.availableSeats < seatCount) {
            return abortAndReturn(session, res, 400, { error: "Not enough seats available" });
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
        await trip.save({ session });

        await session.commitTransaction();
        return res.status(200).json({ message: "Booking created successfully", data: booking });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ error: "Server error while creating booking", details: err.message });
    } finally {
        session.endSession();
    }
};

const makePayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { bookingId, userId, totalCost } = req.body;

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking) return abortAndReturn(session, res, 404, { error: "Booking not found" });

        if (booking.status === CANCELLED) {
            return abortAndReturn(session, res, 400, { error: "Booking already cancelled" });
        }
        if (booking.status === BOOKED) {
            return abortAndReturn(session, res, 400, { error: "Already paid" });
        }

        const bookingTime = new Date(booking.createdAt);
        const currentTime = new Date();

        if ((currentTime - bookingTime) > 5* 60 * 1000) { 
            await cancelBookingRepo(bookingId, session);
            await session.commitTransaction(); 
            return res.status(400).json({ error: "Booking expired and cancelled" });
        }

        if (totalCost !== booking.totalCost) {
            return abortAndReturn(session, res, 400, { error: "Total cost mismatch" });
        }

        if (userId !== booking.user.toString()) {
            return abortAndReturn(session, res, 400, { error: "User ID mismatch" });
        }

        const finalBooking = await updateBookingStatus(bookingId, { status: BOOKED }, session);
        await session.commitTransaction();
        return res.status(200).json({ message: "Payment successful", data: finalBooking });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ error: "Server error while making payment", details: err.message });
    } finally {
        session.endSession();
    }
};

const cancelBookingRepo = async (bookingId, session) => {
    
    const booking = await Booking.findById(bookingId).session(session);
    if (booking.status !== CANCELLED) {
        const trip = await Trip.findById(booking.trip).session(session);
        if (!trip) throw new Error("Trip not found while cancelling booking");

        trip.availableSeats += booking.noOfSeats;
        await trip.save({ session });

        await updateBookingStatus(bookingId, { status: CANCELLED }, session);
    }
};

module.exports = { createBooking, makePayment };
