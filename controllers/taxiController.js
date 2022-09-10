const asyncHandler = require("express-async-handler");
const TaxiBooking = require("../models/taxiBookingModel");

const addBooking = asyncHandler(async (req, res) => {
  const {
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
    userId: req.user.id,
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
};
