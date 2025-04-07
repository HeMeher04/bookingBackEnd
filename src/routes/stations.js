const express = require("express");
const stationsRoute = express.Router();

const { getStationsByCity, getStations, createStation, updateStation, deleteStation } = require("../controllers");

stationsRoute.post("/stations/create",createStation);
stationsRoute.get("/stations/getAll",getStations);
stationsRoute.get("/stations/get/:city",getStationsByCity);
stationsRoute.patch("/stations/update/:station",updateStation);
stationsRoute.delete("/stations/delete/:station",deleteStation);

module.exports = stationsRoute;