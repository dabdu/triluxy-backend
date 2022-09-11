const asyncHandler = require("express-async-handler");
const TaxiBooking = require("../models/taxiBookingModel");
const TaxiCar = require("../models/taxiCarModel");
const addTaxiCar = asyncHandler(async (req, res) => {
  const { categoryName, multiplier, catImg } = req.body;

  if (!categoryName || !catImg || !multiplier) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const car = await TaxiCar.create({
    categoryName,
    multiplier,
    catImg,
    status: "ACTIVE",
  });
  res.status(201).json(car);
});
const addBooking = asyncHandler(async (req, res) => {
  const {
    userId,
    carId,
    transactionId,
    transactionRef,
    amount,
    pickupDate,
    pickupTime,
    originLat,
    originLng,
    originDesc,
    destLat,
    destLng,
    destDesc,
    status,
  } = req.body;

  if (
    !userId ||
    !carId ||
    !transactionId ||
    !transactionRef ||
    !amount ||
    !pickupDate ||
    !pickupTime ||
    !originLat ||
    !originLng ||
    !originDesc ||
    !destLat ||
    !destLng ||
    !destDesc ||
    !status
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const book = await TaxiBooking.create({
    userId,
    carId,
    transactionId,
    transactionRef,
    amount,
    pickupDate,
    pickupTime,
    originLat,
    originLng,
    originDesc,
    destLat,
    destLng,
    destDesc,
    status,
    isPaid: true,
    assignedDriverId: "",
  });
  res.status(201).json(book);
});
const getUserTaxiBookings = asyncHandler(async (req, res) => {
  const taxiBookings = await TaxiBooking.find({ userId: req.params.id });
  res.status(200).json(taxiBookings);
});
const adminGetAllTaxiBookings = asyncHandler(async (req, res) => {
  const taxiBookings = await TaxiBooking.find();
  res.status(200).json(taxiBookings);
});
module.exports = {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
  addTaxiCar,
};
