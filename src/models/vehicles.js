const mongoose = require("mongoose");
const validator = require("validator");

const vehicleSchema = new mongoose.Schema({
    reg_number:{
        type:String,
        required :true,
        unique:true,
        trim: true,
        uppercase: true,
        maxlength:15,
        
        validate(val){
            if(!validator.isAlphanumeric(val)){
                throw new Error("Registration number should only contain alphabets and numbers");
            }
        }
    },
    name:{
        type:String,
        maxlength:30,
    },
    photoUrl:{
        type:String
    },
    type:{
        type:String,
        required:true,
        maxlength:20,
        validate(value){
            if(!["traveller","bus"].includes(value)){
                throw new Error("Invalid type");
            }
        }
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    owner:{
        type:String,
        required:true,
        maxlength:30,
    },
    mobile:{
        type:String,
        required:true,
        validate(val){
            if(!validator.isMobilePhone(val, 'any', { strictMode: false }) || !(val.length >= 10 && val.length <= 15)){
                throw new Error("Invalid mobile number");
            }
        }
    }
    
},{timestamps:true});

module.exports = mongoose.model("Vehicle",vehicleSchema);