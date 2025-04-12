const { Vehicle, Stations, Trip } = require("../models");
const { parseDateTime12Hr } = require("../utils");

const createTrip = async (req, res) => {
    try {
        const {
            vehicleReg, fromStationName, toStationName,
            departureDate, departureTime,
            arrivalDate, arrivalTime,
            price, availableSeats
        } = req.body;

        const vehicle = await Vehicle.findOne({ reg_number: vehicleReg });
        if (!vehicle) throw new Error("Vehicle not found");

        const fromStation = await Stations.findOne({ stations: fromStationName });
        if (!fromStation) throw new Error("From Station not found");

        const toStation = await Stations.findOne({ stations: toStationName });
        if (!toStation) throw new Error("To Station not found");

        const departureDateTime = parseDateTime12Hr(departureDate, departureTime);
        const arrivalDateTime = parseDateTime12Hr(arrivalDate, arrivalTime);
        if (arrivalDateTime <= departureDateTime) {
            return res.status(400).json({ error: "Arrival time must be after departure time" });
        }

        const newTrip = await Trip.create({
            vehicle: vehicle._id,
            fromStation: fromStation._id,
            toStation: toStation._id,
            departureDateAndTime: departureDateTime,
            arrivalDateAndTime: arrivalDateTime,
            price,
            availableSeats
        });

        res.status(201).json({ message: "Trip created successfully", data: newTrip });
    } catch (err) {
        res.status(400).json({ error: `Error in creating trip: ${err.message}` });
    }
};

module.exports = { createTrip };
