//* import dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

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
app.use(morgan("dev"));
//* following line is for EJS
app.use(express.urlencoded({ extended: false }));

//* routes
app.get("/", (req, res) => {
  //   res.send("Hello, friend!");
  res.render("index.ejs");
});

app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});

app.post("/cars", async (req, res) => {
  console.log("body", req.body);
  //   res.send("Car created");
  await Car.create(req.body);
  res.redirect("cars");
});

//* listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
