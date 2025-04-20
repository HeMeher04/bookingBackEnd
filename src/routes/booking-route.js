const express= require("express");
const bookingRouter= express.Router();
const { createBooking, makePayment} = require("../controllers");

bookingRouter.post("/booking/create",createBooking);
bookingRouter.post("/booking/payment",makePayment);

module.exports= bookingRouter;