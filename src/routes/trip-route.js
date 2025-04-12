const express = require("express");
const tripRouter = express.Router();

const { createTrip,getAllTrip,  getTrip, updateTrip, deleteTrip, getAllTripWithFilter } = require("../controllers");

const { validateCreateTrip } = require("../middlewares");

tripRouter.post("/trip/create",validateCreateTrip,createTrip);
tripRouter.get("/trip/getallWithFilter",getAllTripWithFilter);
// tripRouter.get("/trip/get/:id",getTrip);
// tripRouter.patch("trip/update/:id",updateTrip);
// tripRouter.delete("/trip/delete/:id",deleteTrip);

module.exports = tripRouter;

