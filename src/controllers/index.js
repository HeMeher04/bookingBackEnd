const {createVehicle ,getAllVehicle , getParticularVehicle, deleteVehicle,updateVehicle
} = require("./vehicle-controller");

const {createCity ,getAllCity , deleteCity, updateCity} = require("./city-controller");

const {createStation, updateStation, getStations, getStationsByCity, deleteStation} = require("./stations-controller");

const {createTrip, getAllTripWithFilter,getTrip, updateSeats} = require("./trip-controller");

const {createBooking} = require("./booking-controller");

module.exports = {createVehicle , getAllVehicle, getParticularVehicle, deleteVehicle,updateVehicle,createCity ,getAllCity , deleteCity, updateCity,
    createStation,updateStation, getStations,getStationsByCity,deleteStation,
    createTrip,getAllTripWithFilter,getTrip,updateSeats,
    createBooking

};