const mongoose = require("mongoose");

const stationsSchema = new mongoose.Schema({
  stations: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", 
    required: true,
  },
});

module.exports = mongoose.model("Stations", stationsSchema);
