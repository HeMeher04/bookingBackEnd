const { validateVehicleData } = require("../utils")

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
        await Vehicle.findOneAndDelete({reg_number:reg_no});
        res.status(200).json({ message: "Vehicle deleted successfully" });
    }
    catch(err){
        res.status(500).json({ error: "Error in deleting vehicle" });
    }
}

module.exports = { createVehicle,getAllVehicle, getParticularVehicle, deleteVehicle};