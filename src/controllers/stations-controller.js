const {Stations ,City} = require("../models");
const {stationData,updateStationData} = require("../middlewares");
 
const createStation = async(req,res)=>{
    try{
        await stationData(req,res);
        const newStation = await Stations.create(req.body);
        
        res.status(201).json({message:"Station created successfully",data:newStation});
    }
    catch(err){
        res.status(400).json({ error: `Error in adding stations: ${err.message}` });
    }
}
const updateStation = async(req,res)=>{
    try{
        const newdata = req.body;
        const original = await updateStationData(req);
        Object.keys(newdata).forEach(field =>{
            original[field] = newdata[field];
        })
        await original.save();
        res.status(200).json({message:"Station updated successfully",data:original});
    }
    catch(err){
        res.status(400).json({ error: `Error in updating stations: ${err.message}`});
    }
}

const getStations=async(req,res)=>{
    try{
        const stations = await Stations.find().populate("city", "city");
        const result = stations.map(field => ({
            stations: field.stations,
            address: field.address,
            city: field.city.city,
        }));
        res.status(200).json({message:"Stations fetched successfully",data:result});
    }
    catch(err){
        res.status(400).json({ error: `Error in fetching stations: ${err.message}`});
    }
}
const getStationsByCity = async (req, res) => {
    try {
        const cityName = req.params.city;
        const cityDoc = await City.findOne({ city: cityName });
        if (!cityDoc) {
            throw new Error("City not found");
        }

        const stations = await Stations.find({ city: cityDoc._id }).populate("city", "city");

        const result = stations.map(station => ({
            stations: station.stations,
            address: station.address,
            city: station.city.city
        }));

        res.status(200).json({ message: "Stations fetched successfully", data: result });
    } catch (err) {
        res.status(400).json({ error: `Error in fetching stations by city: ${err.message}` });
    }
};


const deleteStation = async(req,res)=>{
    try{
        const station  = req.params.station;
        const isValid = await Stations.findOne({stations:station});
        if(!isValid){
            throw new Error("Station not found");
        }
        await Stations.deleteOne({stations:station});
        res.status(200).json({message:"Station deleted successfully"});
    }
    catch(err){
        res.status(400).json({ error: `Error in deleting stations: ${err.message}`});
    }
}
module.exports = {createStation, updateStation, getStations, getStationsByCity,deleteStation};
