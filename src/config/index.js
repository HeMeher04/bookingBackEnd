const mongoose = require("mongoose");

const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.URI}/${process.env.DB_NAME}`);
        console.log("MongoDB Connected");
    }
    catch{
        throw new Error("Error in connecting to DB");
    }
}
module.exports = connectDB;