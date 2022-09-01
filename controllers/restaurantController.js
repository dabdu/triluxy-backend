const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel");

const adminAddrestaurant = asyncHandler(async (req, res) => {
  const {
    restaurantName,
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

  if (
    !restaurantName ||
    !fImg ||
    !town ||
    !state ||
    !description ||
    !facilities
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const restaurant = await Restaurant.create({
    user: req.user.id,
    restaurantName,
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
  res.status(201).json(restaurant);
});
const adminGetAllRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json(restaurants);
});
module.exports = {
  adminAddrestaurant,
  adminGetAllRestaurants,
};
