const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel");
const ResReservation = require("../models/resReservationModel");
const ResMenuItem = require("../models/resMenuItemModel");
const adminAddrestaurant = asyncHandler(async (req, res) => {
  const {
    restaurantName,
    fImg,
    images,
    address,
    state,
    town,
    openDaysStart,
    openDaysEnd,
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
    !openDaysStart ||
    !openDaysEnd ||
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
    openDaysStart,
    openDaysEnd,
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
const addNewReservation = asyncHandler(async (req, res) => {
  const {
    restaurantId,
    transId,
    checkInDate,
    checkInTime,
    reservePersons,
    status,
  } = req.body;

  if (
    !restaurantId ||
    !transId ||
    !reservePersons ||
    !checkInDate ||
    !checkInTime ||
    !status
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const reservation = await ResReservation.create({
    userId: req.user.id,
    restaurantId,
    transId,
    reservePersons,
    checkInDate,
    checkInTime,
    status,
  });
  res.status(201).json(reservation);
});
const getUserReservations = asyncHandler(async (req, res) => {
  const reservations = await ResReservation.find({ userId: req.params.id });
  res.status(200).json(reservations);
});
const adminGetAllReservations = asyncHandler(async (req, res) => {
  const reservations = await ResReservation.find();
  res.status(200).json(reservations);
});

const addMenuItem = asyncHandler(async (req, res) => {
  const {
    restaurantId,
    menuName,
    menuImg,
    menuType,
    price,
    discountedPrice,
    description,
  } = req.body;

  if (!restaurantId || !price || !menuName || !menuImg || !menuType) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const menu_item = await ResMenuItem.create({
    restaurantId,
    menuName,
    menuImg,
    menuType,
    price,
    discountedPrice,
    description,
  });
  res.status(201).json(menu_item);
});
const getRestaurantMenuItems = asyncHandler(async (req, res) => {
  const menu_items = await ResMenuItem.find({
    restaurantId: req.params.id,
  });
  res.status(200).json(menu_items);
});
module.exports = {
  adminAddrestaurant,
  adminGetAllRestaurants,
  adminGetAllReservations,
  addNewReservation,
  getUserReservations,
  addMenuItem,
  getRestaurantMenuItems,
};
