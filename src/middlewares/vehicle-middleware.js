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

const validateUpdateData = (data) =>{
    try{
        const isUpdatable = ["name" ,"photoUrl", "capacity","owner","mobile" ];
        
        const isEditAllowed = Object.keys(data).every(field => {
            if (!isUpdatable.includes(field)) return false; // Invalid field
            
            if (field === "photoUrl" && !validator.isURL(data[field])) {
                return false;
            }
            if (field === "capacity" && isNaN(Number(data[field]))) {
                return false;
            }
            if (field === "mobile" && !validator.isMobilePhone(data[field])) {
                return false;
            }

            return true;
        });
        return isEditAllowed;
    }
    catch(err){
        throw new Error("Error in updating data");
    }
}


module.exports = {validateVehicleData,validateUpdateData};