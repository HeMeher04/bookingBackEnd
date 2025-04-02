const {createVehicle ,getAllVehicle , getParticularVehicle, deleteVehicle,updateVehicle
} = require("./vehicle-controller");

const {createCity ,getAllCity , deleteCity, updateCity} = require("./city-controller");

module.exports = {createVehicle , getAllVehicle, getParticularVehicle, deleteVehicle,updateVehicle,createCity ,getAllCity , deleteCity, updateCity
};