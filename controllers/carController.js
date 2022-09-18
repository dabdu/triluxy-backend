const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const User = require("../models/userModel");

const addCarDetails = asyncHandler(async (req, res) => {
  const {
    userId,
    carName,
    carModel,
    carColor,
    carImages,
    carDocuments,
    pricePerDay,
    plateNumber,
    plateNumberImg,
    rideCity,
    rideState,
    carSpecs,
    carDesc,
  } = req.body;

  if (
    !userId ||
    !carName ||
    !carModel ||
    !carColor ||
    !plateNumber ||
    !plateNumberImg ||
    !carImages ||
    !carDocuments ||
    !rideCity ||
    !pricePerDay ||
    !carSpecs
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const car = await Car.create({
    userId,
    carName,
    carModel,
    carColor,
    carImages,
    carDocuments,
    pricePerDay,
    plateNumber,
    plateNumberImg,
    rideCity,
    rideState,
    carSpecs,
    carDesc,
    status: "Available",
  });
  res.status(201).json(car);
});
const getCarsByLocation = asyncHandler(async (req, res) => {
  const carsByLocation = await Car.find({
    rideCity: req.params.ride_city,
    status: "Available",
  });
  res.status(200).json(carsByLocation);
});
const getCarsByAvailablity = asyncHandler(async (req, res) => {
  const carsByAvailability = await Car.find({
    status: "Available",
  });
  res.status(200).json(carsByAvailability);
});
module.exports = {
  addCarDetails,
  getCarsByLocation,
  getCarsByAvailablity,
};
