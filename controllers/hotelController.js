const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Reservation = require("../models/reservationModel");
const Room = require("../models/roomModel");
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
  const reservations = await Reservation.find({ userId: req.params.id });
  res.status(200).json(reservations);
});
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find();
  res.status(200).json(reservations);
});
const getBookedReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ status: "BOOKED" });
  res.status(200).json(reservations);
});
const getConfirmedReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ status: "CONFIRMED" });
  res.status(200).json(reservations);
});
const getCheckedInReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ status: "CHECKEDIN" });
  res.status(200).json(reservations);
});
const setCheckedInReservations = asyncHandler(async (req, res) => {
  await Reservation.findByIdAndUpdate(
    req.body.reserveId,
    { status: "CHECKEDIN" },
    {
      new: true,
    }
  );
  res.status(201).json("Checked In Successfully");
});
const getCheckOutReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ status: "CHECKEDOUT" });
  res.status(200).json(reservations);
});
const setCheckedOutReservations = asyncHandler(async (req, res) => {
  const confirmed = await Reservation.findByIdAndUpdate(
    req.body.reserveId,
    { status: "CHECKEDOUT" },
    {
      new: true,
    }
  );
  if (confirmed) {
    const changeStatus = await Room.findByIdAndUpdate(
      req.body.assignedRoomId,
      { status: "Available" },
      {
        new: true,
      }
    );
    if (changeStatus) {
      res.status(201).json("Checkout Successfully");
    }
  }
});
const getCancelReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ status: "CANCEL" });
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
    assignedRoomId: null,
  });
  res.status(201).json(reservation);
});
const confirmBooking = asyncHandler(async (req, res) => {
  const confirmed = await Reservation.findByIdAndUpdate(
    req.body.reserveId,
    { status: "CONFIRMED", assignedRoomId: req.body.assignedRoomId },
    {
      new: true,
    }
  );
  if (confirmed) {
    const changeStatus = await Room.findByIdAndUpdate(
      req.body.assignedRoomId,
      { status: "Occupied" },
      {
        new: true,
      }
    );
    if (changeStatus) {
      res.status(201).json("Confirmation Successully");
    }
  }
});

module.exports = {
  getHotel,
  createHotel,
  adminAddHotel,
  getAllHotels,
  getUserReservations,
  addNewReservation,
  getAllReservations,
  getBookedReservations,
  getConfirmedReservations,
  getCheckedInReservations,
  getCheckOutReservations,
  getCancelReservations,
  confirmBooking,
  setCheckedInReservations,
  setCheckedOutReservations,
};
