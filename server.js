//* import dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const methodOverride = require("method-override");

//* config
const log = require("debug")("cars:server");
const app = express();
const port = 3000;
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => {
  log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Car = require("./models/Car");

//* middleware
app.use(methodOverride("_method"));
app.use(morgan("dev"));
//* following line is for EJS
app.use(express.urlencoded({ extended: false }));

//* routes
app.get("/", (req, res) => {
  //   res.send("Hello, friend!");
  res.render("index.ejs");
});
//? form to create car
app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});
//? create car
app.post("/cars", async (req, res) => {
  console.log("body", req.body);
  //   res.send("Car created");
  await Car.create(req.body);
  res.redirect("cars");
});
//? index of cars
app.get("/cars", async (req, res) => {
  const cars = await Car.find({});
  res.render("cars/index.ejs", { cars });
});
//? show car
app.get("/cars/:carId", async (req, res) => {
  const { carId } = req.params;
  const car = await Car.findById(carId);
  res.render("cars/show.ejs", { car });
});
//? delete car
app.delete("/cars/:carId", async (req, res) => {
  const { carId } = req.params;
  await Car.findByIdAndDelete(carId);
  res.redirect("/cars");
});
//? update car
app.put("/cars/:carId", async (req, res) => {
  const { carId } = req.params;
  const car = await Car.findByIdAndUpdate(carId, req.body, { new: true });
  res.send(car);
});

//* listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
