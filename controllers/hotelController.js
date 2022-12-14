const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const Reservation = require("../models/reservationModel");
const Room = require("../models/roomModel");
const { sendMailFunction } = require("../functions/mailFunction");
const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.find({ user: req.user.id });
  res.status(200).json(hotel);
});
const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.hotel_id);
  res.status(200).json(hotel);
});
const getHotelBySearchedTown = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ town: req.params.town });
  res.status(200).json(hotels);
});
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
});
const createHotel = asyncHandler(async (req, res) => {
  const {
    hotelName,
    fImg,
    address,
    state,
    town,
    lat,
    lng,
    description,
    terms,
  } = req.body;

  if (!hotelName || !fImg || !town || !state || !description) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const hotel = await Hotel.create({
    user: req.user.id,
    hotelName,
    fImg,
    address,
    state,
    town,
    lat: "",
    lng: "",
    description,
    terms,
    status: "Active",
  });
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
    lat: "",
    lng: "",
    description,
    facilities,
    terms,
    status: "Active",
  });
  res.status(201).json(hotel);
});
const getUserReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ userId: req.params.id });
  res.status(200).json(reservations);
});
const getReservationByHotelId = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({
    userId: req.params.hotel_id,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(reservations);
});
const getReservationByHotelAdminId = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({
    hotelAdminId: req.params.user_id,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(reservations);
});
const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().sort({
    createdAt: -1,
  });
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
    hotelAdminId,
    userEmail,
  } = req.body;

  if (
    !hotelId ||
    !categoryId ||
    !hotelAdminId ||
    !transId ||
    !nights ||
    !checkInDate ||
    !checkOutDate ||
    !status ||
    !userEmail
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const reservation = await Reservation.create({
    userId: req.user.id,
    hotelId,
    hotelAdminId,
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
  const hotel_admin = await User.findById(hotelAdminId);
  await sendMailFunction(
    `${hotel_admin.email}`,
    "Urgent, Confirm Reservation",
    `A User Just reserve your Hotel, from ${checkInDate} to ${checkOutDate}, which is ${nights}. Please Login to confirmed user's Reservation. Thanks`
  );
  await sendMailFunction(
    `${userEmail}`,
    "Reservation Successful",
    `Your Payment and Reservation was Successful, Checking In on ${checkInDate} to ${checkOutDate}, which is for ${nights} nights. Please Exercise Patience while we confirm your reservation. Thanks`
  );
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
  getHotelById,
  getHotelBySearchedTown,
  createHotel,
  adminAddHotel,
  getAllHotels,
  getReservationByHotelId,
  getReservationByHotelAdminId,
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
