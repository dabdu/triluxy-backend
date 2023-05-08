const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const FlightBooking = require("../models/flightBookingModel");
const Notification = require("../models/notificationModel");
const { sendMailFunction } = require("../functions/mailFunction");
const addNewBooking = asyncHandler(async (req, res) => {
  const {
    userId,
    userEmail,
    flightDetails,
    amount,
    flightReferenceID,
    transId,
    isPaid,
    status,
  } = req.body;

  if (
    !userId ||
    !userEmail ||
    !flightDetails ||
    !amount ||
    !flightReferenceID ||
    !transId ||
    !status
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const booking = await FlightBooking.create({
    userId,
    userEmail,
    flightDetails,
    amount,
    flightReferenceID,
    transId,
    isPaid,
    status,
  });
  const userContent = `Your Payment and Booking was Successful, Please Exercise Patience while we confirm your booking. You will an email once our processes is done Thanks`;

  await Notification.create({
    userId: req.user.id,
    desc: userContent,
    title: "Successful Flight Booking",
    type: "Flight",
    status: "unread",
  });
  await sendMailFunction(`${userEmail}`, "Successful Flight", userContent);
  await sendMailFunction(
    `triluxyapp@gmail.com`,
    "Flight Booking Request",
    "There is a new flight booking, Please check and confirm the User Booking"
  );
  res.status(201).json(booking);
});
module.exports = { addNewBooking };
