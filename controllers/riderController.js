const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Rider = require("../models/riderModel");
const { sendMailFunction } = require("../functions/mailFunction");

const addRiderDeatils = asyncHandler(async (req, res) => {
  const { userId, rideCity, rideState } = req.body;

  if (!userId || !rideCity || !rideState) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const rider = await Rider.create({
    userId,
    rideCity,
    rideState,
    status: "Available",
  });
  if (!rider) {
    res.status(500);
    throw new Error("Error Occured, Please Try Again");
  }
  res.status(201).json(rider);
});
const getRiderByUserId = asyncHandler(async (req, res) => {
  const rider = await Rider.findOne({
    userId: req.params.userId,
  });
  res.status(200).json(rider);
});
const getRiderByLocation = asyncHandler(async (req, res) => {
  const ridersByLocation = await Rider.find({
    rideCity: req.params.ride_city,
    status: "Available",
  });
  res.status(200).json(ridersByLocation);
});
module.exports = {
  addRiderDeatils,
  getRiderByUserId,
  getRiderByLocation,
};
