const {Stations} = require("../models");
const {stationData,updateStationData} = require("../utils");
 
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
        const stations = await Stations.find();
        res.status(200).json({message:"Stations fetched successfully",data:stations});
    }
    catch(err){
        res.status(400).json({ error: `Error in fetching stations: ${err.message}`});
    }
}
const getStationsByCity= async(req,res)=>{
    try{
        const city = req.params.city;
        if(!city){
            throw new Error("City not present");
        }
        const stations = await Stations.find({city:city});
        res.status(200).json({message:"Stations fetched successfully",data:stations});
    }
    catch(err){
        res.status(400).json({ error: `Error in fetching stations by city: ${err}`});
    }
}
const deleteStation = async(req,res)=>{
    try{
        const station  = req.params.station;
        const isValid = await Stations.findOne({stations:station});
        console.log(isValid);
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
