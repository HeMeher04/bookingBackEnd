const { Vehicle, Stations, Trip, City } = require("../models");
const { parseDateTime12Hr } = require("../utils");
/*
{
  "vehicleReg": "KA01AB1234",
  "fromStationName": "Satya Sai Hospital",
  "toStationName": "Ooty",
  "departureDate": "08-04-25",
  "departureTime": "11:24 PM",
  "arrivalDate": "10-04-25",
  "arrivalTime": "05:45 AM",
  "price": 3000
}
  */
const createTrip = async (req, res) => {
    try {
        const {
            vehicleReg, fromStationName, toStationName,
            departureDate, departureTime,
            arrivalDate, arrivalTime,
            price
        } = req.body;

        const vehicle = await Vehicle.findOne({ reg_number: vehicleReg });
        if (!vehicle) throw new Error("Vehicle not found");

        const availableSeats = vehicle.capacity;

        const fromStation = await Stations.findOne({ stations: fromStationName });
        if (!fromStation) throw new Error("From Station not found");
        const fromCityId = fromStation.city;

        const toStation = await Stations.findOne({ stations: toStationName });
        if (!toStation) throw new Error("To Station not found");
        const toCityId = toStation.city;

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
            fromCityId,
            toCityId,
            availableSeats
        });

        res.status(201).json({ message: "Trip created successfully", data: newTrip });
    } catch (err) {
        res.status(400).json({ error: `Error in creating trip: ${err.message}` });
    }
};

/* 
http://localhost:3000/trip/getAllWithFilter?trips=Bengaluru-Ooty&price=300-3000&departureDate=2025-04-08&sort=price_desc,availableSeats_asc
*/
const getAllTripWithFilter = async (req, res) => {
    try {
        const query = req.query;
        const customFilter = {};
        const sortFilter={};
        if(query.trips){
            [fromCity, toCity] = query.trips.split("-");
            fromCityId = await City.findOne({ city: fromCity });
            toCityId = await City.findOne({ city: toCity });
            if(fromCityId && toCityId) {
                customFilter.fromCityId = fromCityId._id;
                customFilter.toCityId = toCityId._id;
            }
            else if(fromCityId) {
                customFilter.fromCityId = fromCityId._id;
            }
            else if(toCityId) {
                customFilter.toCityId = toCityId._id;
            }
        }

        if (query.price) {
            const [minPrice, maxPrice] = query.price.split("-").map(Number);
            if (Number.isFinite(minPrice) && Number.isFinite(maxPrice)) {
                customFilter.price = { $gte: minPrice, $lte: maxPrice };
            } else if (Number.isFinite(minPrice)) {
                customFilter.price = { $gte: minPrice };
            } else if (Number.isFinite(maxPrice)) {
                customFilter.price = { $lte: maxPrice };
            }
        }
        //YYYY-MM-DD format
        if (query.departureDate) {
            const departureDate = new Date(query.departureDate);
            
            if (!isNaN(departureDate.getTime())) {
                const startOfDay = new Date(departureDate);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(departureDate);
                endOfDay.setHours(23, 59, 59, 999);

                customFilter.departureDateAndTime = {
                    $gte: startOfDay,
                    $lte: endOfDay
                };
            }
        }

        if (query.seat) {
            const availableSeats = Number(query.seat);
            if (!isNaN(availableSeats)) {
                customFilter.availableSeats = { $gte: availableSeats }; 
            } 
        }

        if (query.sort) {
            const params = query.sort.split(',');
            params.forEach((param) => {
                const parts = param.split('_');
                const field = parts[0]
                if (field) {  
                    const order = (parts[1] || 'asc').toLowerCase();  
                    sortFilter[field] = order === 'desc' ? -1 : 1;
                }
            });
        }
        
        const trips = await Trip.find(customFilter).populate("vehicle fromStation toStation").sort(sortFilter);
        const dataToShow = trips.map(trip => {
            return {
                vehicleReg: trip.vehicle.reg_number,
                fromCity: trip.fromCityId.city,
                fromStation: trip.fromStation.stations,
                toCity: trip.toCityId.city,
                toStation: trip.toStation.stations,
                departureDateAndTime: trip.departureDateAndTime,
                arrivalDateAndTime: trip.arrivalDateAndTime,
                price: trip.price,
                availableSeats: trip.availableSeats
            };
        });

        res.status(200).json({ data: dataToShow });
    }
    catch (err) {
        res.status(400).json({ error: `Error in getting all trips: ${err.message}` });
    }
}


/*
http://localhost:3000/trip/get/67fa52aded134877db80b229
 */
const getTrip = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const trip = await Trip.findById(tripId).populate("vehicle fromStation toStation fromCityId toCityId");
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        const dataToShow = {
            vehicleReg: trip.vehicle.reg_number,
            vehicleType: trip.vehicle.type,
            fromCity: trip.fromCityId.city,
            fromStation: trip.fromStation.stations,
            toCity: trip.toCityId.city,
            toStation: trip.toStation.stations,
            departureDateAndTime: trip.departureDateAndTime,
            arrivalDateAndTime: trip.arrivalDateAndTime,
            price: trip.price,
            availableSeats: trip.availableSeats
        };
        res.status(200).json({ data: dataToShow });
    }
    catch(err) {
        res.status(400).json({ error: `Error in getting trip: ${err.message}` });
    }
}


/*
http://localhost:3000/trip/seats/680108f71cf6282f5b47c405
{
    "seats":2
    // "decrease":0
}
*/
const updateSeats = async(req,res)=>{
    try{
        const tripId = req.params.tripId;
        const { seats, decrease } = req.body;
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }
        if(!decrease) {
            if (trip.availableSeats < seats) {
                return res.status(400).json({ error: "Not enough available seats" });
            }
            trip.availableSeats -= seats;
            
        }
        else{
            trip.availableSeats += seats;
        }
        await trip.save();
        res.status(200).json({ message: "Seats updated successfully", data: trip });
    }
    catch{
        res.status(400).json({ error: `Error in updating seats: ${err.message}` });
    }
}

module.exports = { createTrip, getAllTripWithFilter, getTrip ,updateSeats};
