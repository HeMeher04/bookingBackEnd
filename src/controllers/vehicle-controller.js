const { validateVehicleData, validateUpdateData } = require("../middlewares");

const { Vehicle } = require("../models");

const createVehicle = async (req, res) => {
    try {
        const data = req.body;
        validateVehicleData(req);
        const vehicle = new Vehicle(data);
        await vehicle.save();
        res.json({ message: "Vehicle added successfully", vehicle });
    } catch (err) {
        res.status(400).json({ error: `Error in adding vehicle: ${err.message}` });
    }
};

const getAllVehicle = async(req,res)=>{
    try{
        const vehicles = await Vehicle.find(); 
        res.json({ message: "All vehicles fetched successfully", vehicles });

    }
    catch{
        res.status(500).json({ error: "Error in getting all vehicles" });
    }
}

const getParticularVehicle = async(req,res)=>{
    try{
        const reg_no = req.params.reg_no;
        const vehicles = await Vehicle.find({reg_number:reg_no}); 
        if(vehicles.length ==0 ){
            res.status(404).json({ message : " No Vehicle of this reg_no available" });
        }
        else
            res.json({ message: "vehicle fetched successfully", vehicles });

    }
    catch{
        res.status(500).json({ error: "Error in getting all vehicles" });
    }
}

const deleteVehicle = async(req,res)=>{
    try{
        const reg_no = req.params.reg_no;
        const data = await Vehicle.findOneAndDelete({reg_number:reg_no});
        if(!data ){
            res.status(404).json({ message : " No Vehicle of this reg_no available" });
        }
        else
            res.status(200).json({ message: "Vehicle deleted successfully" });
    }
    catch(err){
        res.status(500).json({ error: "Error in deleting vehicle" });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const reg_no = req.params.reg_no;
        const original = await Vehicle.findOne({ reg_number: reg_no });

        if (!original) {
            return res.status(404).json({ message: "No Vehicle of this reg_no available" });
        }

        const data = req.body;
        if (!validateUpdateData(data)) {
            return res.status(400).json({ message: "Invalid data" });
        }

        Object.keys(data).forEach(field => {
            original[field] = data[field];
        });

        await original.save();
        res.json({ message: "Update data successfully" });

    } catch (err) {
        res.status(500).json({ error: "Error in updating vehicle" });
    }
};


module.exports = { createVehicle,getAllVehicle, getParticularVehicle, deleteVehicle, updateVehicle};