const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const User = require("../models/userModel");
const CarBooking = require("../models/carBookingModel");
const { sendMailFunction } = require("../functions/mailFunction");

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
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.status(200).json(car);
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
const carBooking = asyncHandler(async (req, res) => {
  const {
    userId,
    carId,
    transactionId,
    transactionRef,
    amount,
    days,
    pickupDate,
    returnDate,
    pickupLat,
    pickupLng,
    pickupDesc,
    returnLat,
    returnLng,
    returnDesc,
    status,
    isPaid,
    carOwnerId,
  } = req.body;

  if (
    !userId ||
    !carId ||
    !transactionId ||
    !transactionRef ||
    !amount ||
    !days ||
    !pickupDate ||
    !returnDate ||
    !pickupLat ||
    !pickupLng ||
    !pickupDesc ||
    !status ||
    !carOwnerId
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const book = await CarBooking.create({
    userId,
    carId,
    transactionId,
    transactionRef,
    amount,
    days,
    pickupDate,
    returnDate,
    pickupLat,
    pickupLng,
    pickupDesc,
    returnLat,
    returnLng,
    returnDesc,
    status,
    isPaid,
  });
  if (!book) {
    return;
  } else {
    const car_owner = await User.findById(carOwnerId);
    await sendMailFunction(
      `${car_owner.email}`,
      "Urgent, Confirm Car Rent Request",
      `A User Just request to rent your car from ${pickupDate} to ${returnDate}, Please Login to confirmed user's booking. Thanks`
    );
  }
  res.status(201).json(book);
});
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await CarBooking.find({
    userId: req.params.id,
  });
  res.status(200).json(bookings);
});
module.exports = {
  addCarDetails,
  getCarById,
  getCarsByLocation,
  getCarsByAvailablity,
  carBooking,
  getUserBookings,
};
