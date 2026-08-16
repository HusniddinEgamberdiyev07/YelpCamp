const express = require("express");
const mongoose = require("mongoose");
const CampgroundModel = require("./models/campground")
const path = require("path");
const method_override = require("method-override")
const engine = require("ejs-mate");

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(()=>console.log("Database is connected"))
    .catch(err=>console.log(`Something went wrong \n ${err}`))


app.engine("ejs", engine)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({extended:true}))
app.use(method_override('_method'))


app.get("/", async (req, res)=>{
    res.render("home")
})

app.get("/campgrounds", async (req, res)=>{
    const camps = await CampgroundModel.find({});
    
    res.render("./campgrounds/index", {camps})
})

app.get("/campgrounds/new", (req, res)=>{
    res.render("./campgrounds/new")
})

app.post("/campgrounds", async (req, res)=>{
    const camp = new CampgroundModel(req.body.campground);
    await camp.save();

    res.redirect(`/campgrounds/${camp._id}`)
})

app.get("/campgrounds/:id", async (req, res)=>{
    const {id} = req.params;
    const camp = await CampgroundModel.findById(id);
    console.log(camp);
    
    
    res.render("./campgrounds/show", {camp});
})

app.get("/campgrounds/:id/edit", async (req, res)=>{
    console.log(req.params.id);
    
    const camp = await CampgroundModel.findById(req.params.id);

    res.render("./campgrounds/edit", {camp})
})

app.put("/campgrounds/:id", async (req, res)=>{
    const {id} = req.params;
    const camp = await CampgroundModel.findByIdAndUpdate(id, req.body.campground);

    res.redirect(`/campgrounds/${camp._id}`)
})

app.delete("/campgrounds/:id", async (req, res)=>{
    await CampgroundModel.findByIdAndDelete(req.params.id);

    res.redirect("/campgrounds");
})


app.listen(3000, ()=>{
    console.log("Listening on port: 3000");
})