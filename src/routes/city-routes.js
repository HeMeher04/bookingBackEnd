const express = require("express");
const cityRoute = express.Router();
const { createCity ,getAllCity , deleteCity, updateCity} = require("../controllers");

cityRoute.post("/city/create", createCity);
cityRoute.get("/city/getCity",getAllCity);
cityRoute.delete("/city/delete/:city",deleteCity);
cityRoute.patch("/city/rename/:city",updateCity);

module.exports = cityRoute;