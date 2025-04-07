const {City,Stations} = require("../models");

const stationData= async(req)=>{
    const {stations, address, city} = req.body;
    if(!stations || !address ||  !city){
        throw new Error("Please enter all the field");
    }
    isValidCity = await City.findOne({city});
    if(!isValidCity){
        throw new Error("City is not present");
    }   
}
const updateStationData=async(req)=>{
    const {stations, address, city} = req.body;
    const stationtoUpdate = req.params.station;
    const isStationPresent = await Stations.findOne({stations:stationtoUpdate});
    if(!isStationPresent){
        throw new Error("Station is not present");
    }
    if(city){
        isValidCity = await City.findOne({city});
        if(!isValidCity){
            throw new Error("City is not present");
        }   
    }
    return isStationPresent;
}
module.exports = {stationData,updateStationData};