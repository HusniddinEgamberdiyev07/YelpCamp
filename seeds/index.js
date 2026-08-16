const mongoose = require("mongoose");
const CampgroundModel = require("../models/campground")
const cities = require("./cities");
const {descriptors, places} = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(()=>console.log("Database is connected"))
    .catch(err=>console.log(`Something went wrong \n ${err}`))

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const createSeed = async ()=>{
    await CampgroundModel.deleteMany({});
    for(let i = 0; i<50; i++){
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*10)+20;
        const camp = new CampgroundModel({
            location:`${cities[rand1000].city} ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptatem, suscipit voluptas possimus voluptatibus optio ullam ducimus. Quidem iure, excepturi ipsum mollitia ducimus, magni repellat quasi recusandae officia, fugiat quos! Quam quo nihil maiores obcaecati facere optio laudantium libero velit doloribus porro eos aliquam, maxime quasi harum vero tempore corporis magnam autem! Explicabo, inventore facere. Amet laboriosam aliquam iste voluptates!",
            price
        })
        await camp.save()
    }
}

createSeed().then(()=>{
    mongoose.connection.close();
})