const express = require("express");
const connectDB = require("./config/index.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {vehicleRoute, cityRoute, stationsRoute} = require("./routes");

app.use("/",vehicleRoute);
app.use("/",cityRoute);
app.use("/",stationsRoute);

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})

