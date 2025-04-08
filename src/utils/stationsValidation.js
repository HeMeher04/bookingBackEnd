const {City,Stations} = require("../models");



const stationData = async (req) => {
    const { stations, address, city } = req.body;
    if (!stations || !address || !city) {
        throw new Error("Please enter all the fields");
    }

    const isValidCity = await City.findOne({ city });
    if (!isValidCity) {
        throw new Error("City is not present");
    }
    // Replace string city with ObjectId in req.body
    req.body.city = isValidCity._id;
};

const updateStationData = async (req) => {
    const { city } = req.body;
    const stationToUpdate = req.params.station;

    const isStationPresent = await Stations.findOne({ stations: stationToUpdate });
    if (!isStationPresent) {
        throw new Error("Station is not present");
    }

    if (city) {
        const isValidCity = await City.findOne({ city });
        if (!isValidCity) {
            throw new Error("City is not present");
        }
        req.body.city = isValidCity._id;
    }

    return isStationPresent;
};

module.exports = {stationData,updateStationData};