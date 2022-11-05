const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Rider = require("../models/riderModel");
const ResMenuOrder = require("../models/resMenuOrder");
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
const onAcceptRequest = asyncHandler(async (req, res) => {
  const { assignedRiderId, orderId, userId, restaurantName, restaurantUserId } =
    req.body;
  const accept = await ResMenuOrder.findByIdAndUpdate(
    orderId,
    { status: "DELIVERY_ACCEPTED", assignedRiderId: assignedRiderId },
    {
      new: true,
    }
  );
  if (!accept) {
    res.status(400);
    throw new Error("Error Occured!!!");
  } else {
    const user = await User.findById(userId);
    await sendMailFunction(
      `${user.email}`,
      "Delivery Confirmed",
      `A Dispatch Rider has Confirmed your Delivery with ${restaurantName}, awaiting His pickup from the Restaurant to Your Location. Meanwhile you can Login to your Dashboard and check the Dispatch Rider's details. Thanks`
    );
    const restaurant = await User.findById(restaurantUserId);
    await sendMailFunction(
      `${restaurant.email}`,
      "Request Delivery Accept",
      `A Dispatch Rider has Accept your Delivery Request to Customer, Login your dashboard to check his details while you await his Pickup. Thanks`
    );
  }
  res.status(201).send(accept);
});
module.exports = {
  addRiderDeatils,
  getRiderByUserId,
  getRiderByLocation,
  onAcceptRequest,
};
