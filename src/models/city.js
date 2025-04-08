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


citySchema.pre('save', async function(next) {
    if (this.isModified('city')) {
        try {
            const previous = await this.model.findById(this._id);
            if (previous.city !== this.city) {
                await Stations.updateMany(
                    { city: previous.city },
                    { $set: { city: this.city } }
                );
            }
            next();
        } catch (err) {
            next(err);
        }
    }
});


citySchema.pre('findOneAndDelete', async function(next) {
    try {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
            await Stations.deleteMany({ city: doc.city });
        }
        next();
    } catch (err) {
        next(err);
    }
});


module.exports = mongoose.model("City",citySchema);