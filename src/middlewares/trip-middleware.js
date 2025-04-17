const validator = require("validator");

const validateCreateTrip = (req, res, next) => {
    const {
        vehicleReg, fromStationName, toStationName,
        departureDate, departureTime,
        arrivalDate, arrivalTime,
        price
    } = req.body;

    if (!vehicleReg || !fromStationName || !toStationName ||
        !departureDate || !departureTime ||
        !arrivalDate || !arrivalTime ||
        price === undefined
    ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isDate(departureDate, { format: "DD-MM-YY", strictMode: true })) {
        return res.status(400).json({ error: "Invalid departure date format. Use DD-MM-YY" });
    }

    if (!validator.matches(departureTime, /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i)) {
        return res.status(400).json({ error: "Invalid departure time format. Use hh:mm AM/PM" });
    }

    if (!validator.isDate(arrivalDate, { format: "DD-MM-YY", strictMode: true })) {
        return res.status(400).json({ error: "Invalid arrival date format. Use DD-MM-YY" });
    }

    if (!validator.matches(arrivalTime, /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i)) {
        return res.status(400).json({ error: "Invalid arrival time format. Use hh:mm AM/PM" });
    }

    if (!validator.isNumeric(price.toString()) || price < 0) {
        return res.status(400).json({ error: "Invalid price" });
    }

    next();
};

const validateUpdateSeats = (req, res, next) => {
    const { seats } = req.body;
    if (!seats || !validator.isNumeric(seats.toString()) || seats < 0){
        return res.status(400).json({ error: "Invalid number of seats" });
    }
    next();
}

module.exports = { validateCreateTrip, validateUpdateSeats };
