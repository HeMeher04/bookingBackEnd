const express = require("express");
const vehicleRoute = express.Router();
const { createVehicle ,getAllVehicle , getParticularVehicle} = require("../controllers");

vehicleRoute.post("/vehicles/create", createVehicle);
vehicleRoute.get("/vehicles/getVehicle",getAllVehicle);
vehicleRoute.get("/vehicles/getVehicle/:reg_no",getParticularVehicle);

module.exports = vehicleRoute;