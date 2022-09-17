const asyncHandler = require("express-async-handler");
const TaxiBooking = require("../models/taxiBookingModel");
const TaxiCar = require("../models/taxiCarModel");
const TaxiRide = require("../models/taxiRides");
const User = require("../models/userModel");
const TaxiDriver = require("../models/taxiDriverModel");
const { sendMailFunction } = require("../functions/mailFunction");
const addTaxiRides = asyncHandler(async (req, res) => {
  const { categoryName, multiplier, catImg } = req.body;

  if (!categoryName || !catImg || !multiplier) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const ride = await TaxiRide.create({
    categoryName,
    multiplier,
    catImg,
    status: "ACTIVE",
  });
  res.status(201).json(ride);
});
const getTaxiRides = asyncHandler(async (req, res) => {
  const rides = await TaxiRide.find();
  res.status(200).json(rides);
});
const addBooking = asyncHandler(async (req, res) => {
  const {
    userId,
    categoryId,
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
    rideCity,
  } = req.body;

  if (
    !userId ||
    !categoryId ||
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
    !status ||
    !rideCity
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const book = await TaxiBooking.create({
    userId,
    categoryId,
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
    assignedCarId: "",
  });
  if (!book) {
    return;
  } else {
    const driversByLocation = await TaxiDriver.find({
      rideCity: rideCity,
      status: "Available",
    });
    for (const val of driversByLocation) {
      const drivers = await User.find({ _id: val.userId });
      await sendMailFunction(
        `${drivers[0].email},`,
        "Urgent, Confirm Ride Request",
        "A User Just Booked a ride now with your locality, Quickly Login into your dashboard and Accept, by anyone does. Thanks"
      );
    }
  }
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
const addtaxiDriverDetails = asyncHandler(async (req, res) => {
  const {
    userId,
    carName,
    carModel,
    carColor,
    plateNumber,
    plateNumberImg,
    carImage,
    licenseNumber,
    licenseImg,
    carDocuments,
    rideCity,
    rideState,
    carDesc,
  } = req.body;

  if (
    !userId ||
    !carName ||
    !carModel ||
    !carColor ||
    !plateNumber ||
    !plateNumberImg ||
    !carImage ||
    !licenseNumber ||
    !licenseImg ||
    !carDocuments ||
    !rideCity ||
    !rideState
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const taxi_driver = await TaxiDriver.create({
    userId,
    carName,
    carModel,
    carColor,
    plateNumber,
    plateNumberImg,
    carImage,
    licenseNumber,
    licenseImg,
    carDocuments,
    rideCity,
    rideState,
    carDesc,
    status: "Available",
  });
  if (!taxi_driver) {
    res.status(500);
    throw new Error("Error Occured, Please Try Again");
  } else {
    await User.findByIdAndUpdate(
      userId,
      { userStatus: "activeTaxiDriver" },
      {
        new: true,
      }
    );
    res.status(201).json(taxi_driver);
  }
});
const getTaxiDriversByLocation = asyncHandler(async (req, res) => {
  const driversByLocation = await TaxiDriver.find({
    rideCity: req.params.ride_city,
    status: "Available",
  });
  res.status(200).json(driversByLocation);
});
const getAvailableTaxiDrivers = asyncHandler(async (req, res) => {
  const drivers = await TaxiDriver.find({ status: "Available" });
  res.status(200).json(drivers);
});
module.exports = {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
  addTaxiRides,
  getTaxiRides,
  addtaxiDriverDetails,
  getTaxiDriversByLocation,
  getAvailableTaxiDrivers,
};
