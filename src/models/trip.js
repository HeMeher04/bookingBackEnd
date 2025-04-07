const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    reg_number :{
        type:String,
        required: true,
        uppercase: true,
        trim: true,
    },
    boardingStation:{
        type:String,
        required: true,
        trim:true,
    },
    arrivialStation:{
        type:String,
        required: true,
        trim:true,
    },
    boardingCity:{
        type:String,
        required: true,
        trim:true,

    },
    arrivialCity:{
        type:String,
        required: true,
        trim:true,
    },
    FormData:{
        type:Date,
        required: true,
    },
    ToDate:{
        type:Date,
        required: true,
    },
    seatleft:{
        type:Number,
        required: true,
        min:0,
    },
    price:{
        type:Number,
        required: true,
        min:0,
    }
},{timestamps:true});

module.exports= new mongoose.model("Trip",tripSchema);