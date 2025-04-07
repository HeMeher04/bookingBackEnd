const mongoose = require("mongoose");

const stationsSchema = new mongoose.Schema({
    stations:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2,
        maxlength:30,
    },
    address:{
        type:String,
        required:true,
        minlength:2,
        maxlength:60,
    },
    city:{
        type:String,
        required:true,
        minlength:2,
        maxlength:30,
    }
})
module.exports = mongoose.model("Stations",stationsSchema);