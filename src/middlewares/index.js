const {stationData,updateStationData} = require("./station-middleware");
const {validateVehicleData,validateUpdateData} = require("./vehicle-middleware");

const {validateCreateTrip} = require("./trip-middleware");

module.exports = {
    validateVehicleData,validateUpdateData,
    stationData,updateStationData,
    validateCreateTrip,
};