const validator = require("validator");

const validateVehicleData = (req)=>{
    const {reg_number,name,photoUrl,type,capacity,owner,mobile} = req.body;

    if(!validator.isURL(photoUrl)){
        throw new Error("Enter a valid photo URL");
    }
    if(!reg_number || !type || !owner || !capacity){
        throw new Error("Please fill all the fields");
    }
    if(!validator.isMobilePhone(mobile)){
        throw new Error("Enter a valid mobile number");
    }
}

module.exports = {validateVehicleData};