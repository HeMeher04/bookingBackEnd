const mongoose = require('mongoose');
const Booking = require('../models/booking');

async function createBookingRepo(bookingPayload,session = null){
    if(session){
        const response = await Booking.create([bookingPayload], { session });
        return response[0];
    }
    return await mongoose.transaction(async (newSession) => {
        const response = await Booking.create([bookingPayload], { session: newSession });
        return response[0];
    });
}

async function updateBookingStatus(id, data, session = null) {
    if (session) {
        const response = await Booking.findByIdAndUpdate(
            id, 
            data, 
            { 
                new: true,
                runValidators: true, 
                session 
            }
        );
        return response;
    }
    return await mongoose.transaction(async (newSession) => {
        const response = await Booking.findByIdAndUpdate(
            id, 
            data, 
            { 
                new: true,
                runValidators: true,
                session: newSession 
            }
        );
        return response;
    });
}

const abortAndReturn = async (session, res, code, message) => {
    await session.abortTransaction();
    session.endSession();
    return res.status(code).json(message);
};




module.exports = { createBookingRepo, updateBookingStatus, abortAndReturn };