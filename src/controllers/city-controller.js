const { City } = require("../models");
const validator = require("validator");

const createCity = async (req, res) => {
    try {
        const data = req.body;
        if(!validator.isAlpha(data.city) || data.city.length <3){
            return res.status(400).json({message: "Issue in city name."})
        }
        const name = new City(data);
        await name.save();
        res.json({ message: "City added successfully", name });
    } catch (err) {
        res.status(400).json({ error: `Error in adding city: ${err.message}` });
    }
};


const getAllCity = async(req,res)=>{
    try{
        const city = await City.find(); 
        res.json({ message: "All city fetched successfully", city });

    }
    catch{
        res.status(500).json({ error: "Error in getting all city" });
    }
}


const deleteCity = async(req,res)=>{
    try{
        const city = req.params.city;
        const data = await City.findOneAndDelete({city});
        if(!data ){
            res.status(404).json({ message : " No City of this name available" });
        }
        else
            res.status(200).json({ message: "City deleted successfully" });
    }
    catch(err){
        res.status(500).json({ error: "Error in deleting city" });
    }
}

const updateCity = async(req,res)=>{
    try{
        const city = req.params.city;
        const original = await City.findOne({city});
        if(!original ){
            return res.status(404).json({ message : " No city of this name available" });
        }
        const data = req.body;
        if(data.city.length<3){
            return res.status(400).json({ message : " city name should be at least 3 char"});
        }
        
        Object.keys(data).forEach((field)=>{
            original[field] = data[field];
        })
        await original.save();
        return res.json({message:"Update data sucessfully city"});
        
    }
    catch(err){
        res.status(500).json({ error: "Error in updating city" +err });
    }
}

module.exports = { createCity ,getAllCity , deleteCity, updateCity};