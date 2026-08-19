const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String
})

const studentsSchema = new Schema({
    name:String,
    level:String,
    
})

module.exports = mongoose.model("Campground", CampgroundSchema);