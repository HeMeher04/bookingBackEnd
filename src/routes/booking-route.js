const express= require("express");
const bookingRouter= express.Router();
const { createBooking } = require("../controllers");

bookingRouter.post("/booking/create",createBooking);

module.exports= bookingRouter;