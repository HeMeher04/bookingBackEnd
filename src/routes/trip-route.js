const express = require("express");
const tripRouter = express.Router();

const { createTrip,getAllTrip,  getTrip, updateTrip, deleteTrip, getAllTripWithFilter, updateSeats } = require("../controllers");

const { validateCreateTrip, validateUpdateSeats } = require("../middlewares");

tripRouter.post("/trip/create",validateCreateTrip,createTrip);
tripRouter.get("/trip/getAllWithFilter",getAllTripWithFilter);
tripRouter.get("/trip/get/:tripId",getTrip);
tripRouter.patch("/trip/seats/:tripId",validateUpdateSeats,updateSeats);
// tripRouter.patch("trip/update/:id",updateTrip);
// tripRouter.delete("/trip/delete/:id",deleteTrip);

module.exports = tripRouter;

