const express = require("express");
const vehicleRoute = express.Router();
const { createVehicle ,getAllVehicle , getParticularVehicle, deleteVehicle, updateVehicle} = require("../controllers");

vehicleRoute.post("/vehicles/create", createVehicle);
vehicleRoute.get("/vehicles/getVehicle",getAllVehicle);
vehicleRoute.get("/vehicles/getVehicle/:reg_no",getParticularVehicle);
vehicleRoute.delete("/vehicles/delete/:reg_no",deleteVehicle);
vehicleRoute.patch("/vehicles/update/:reg_no",updateVehicle);

module.exports = vehicleRoute;