const mongoose = require("mongoose");
const validator = require("validator");

const citySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2,
        maxlength:20,
    }
})
module.exports = mongoose.model("City",citySchema);