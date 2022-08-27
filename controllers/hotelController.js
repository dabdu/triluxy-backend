const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Reservation = require("../models/reservationModel");
const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.find({ user: req.user.id });
  res.status(200).json(hotel);
});
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});
const createHotel = asyncHandler(async (req, res) => {
  const {
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  } = req.body;

  if (!hotelName || !fImg || !town || !state || !description || !facilities) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const hotelExist = await Hotel.findOne({ user: req.user.id });
  if (hotelExist) {
    res.status(400);
    throw new Error("Hotel Already Exist");
  }
  const hotel = await Hotel.create({
    user: req.user.id,
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  });
  if (hotel) {
    await User.findByIdAndUpdate(
      req.user.id,
      { userStatus: "activeHotelAdmin" },
      {
        new: true,
      }
    );
  }
  res.status(201).json(hotel);
});
const adminAddHotel = asyncHandler(async (req, res) => {
  const {
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  } = req.body;

  if (!hotelName || !fImg || !town || !state || !description || !facilities) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const hotel = await Hotel.create({
    user: req.user.id,
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  });
  res.status(201).json(hotel);
});
const getUserReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user.id });
  res.status(200).json(reservations);
});
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find();
  res.status(200).json(reservations);
});
const addNewReservation = asyncHandler(async (req, res) => {
  const {
    hotelId,
    categoryId,
    transId,
    nights,
    amount,
    checkInDate,
    checkOutDate,
    isPaid,
    status,
  } = req.body;

  if (
    !hotelId ||
    !categoryId ||
    !transId ||
    !nights ||
    !checkInDate ||
    !checkOutDate ||
    !status
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const reservation = await Reservation.create({
    userId: req.user.id,
    hotelId,
    categoryId,
    transId,
    nights,
    amount,
    checkInDate,
    checkOutDate,
    isPaid,
    status,
    assignedRoom: ""
  });
  res.status(201).json(reservation);
});

module.exports = {
  getHotel,
  createHotel,
  adminAddHotel,
  getAllHotels,
  getUserReservations,
  addNewReservation,
  getAllReservations
};
