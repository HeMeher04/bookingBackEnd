const mongoose = require("mongoose");
const Stations  = require("./stations");

const citySchema = new mongoose.Schema({
    city:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:2,
        maxlength:20,
    }
})

citySchema.pre('findOneAndDelete', async function(next) {
    try {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
            await Stations.deleteMany({ city: doc._id });
        }
        next();
    } catch (err) {
        next(err);
    }
});


module.exports = mongoose.model("City",citySchema);