const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Restaurant = require("../../models/restaurantModel");
const ResReservation = require("../../models/resReservationModel");
const ResMenuOrder = require("../../models/resMenuOrder");
const ResMenuItem = require("../../models/resMenuItemModel");
const GetAllRestaurantAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({
    userRole: "resAdmin",
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(admins);
});
const GetAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find().sort({
    createdAt: -1,
  });
  res.status(200).json(restaurants);
});
const GetAllReservations = asyncHandler(async (req, res) => {
  const reservations = await ResReservation.find()
    .sort({
      createdAt: -1,
    })
    .populate("userId")
    .populate("restaurantId");
  res.status(200).json(reservations);
});
const GetAllDishOrders = asyncHandler(async (req, res) => {
  const reservations = await ResMenuOrder.find()
    .sort({
      createdAt: -1,
    })
    .populate("userId")
    .populate("restaurantId");
  res.status(200).json(reservations);
});
const GetAllMenuItems = asyncHandler(async (req, res) => {
  const reservations = await ResMenuItem.find()
    .sort({
      createdAt: -1,
    })
    .populate("restaurantId");
  res.status(200).json(reservations);
});

module.exports = {
  GetAllRestaurantAdmins,
  GetAllRestaurants,
  GetAllReservations,
  GetAllDishOrders,
  GetAllMenuItems,
};
