const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const Restaurant = require("../../models/restaurantModel");
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

module.exports = { GetAllRestaurantAdmins, GetAllRestaurants };
