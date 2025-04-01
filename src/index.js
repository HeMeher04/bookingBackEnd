const express = require("express");
const connectDB = require("./config/index.js");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {vehicleRoute} = require("./routes");

app.use("/",vehicleRoute);

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})

