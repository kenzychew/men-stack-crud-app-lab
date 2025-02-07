const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  mileage: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
