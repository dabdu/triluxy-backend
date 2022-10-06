const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/restaurantModel");
const ResReservation = require("../models/resReservationModel");
const ResMenuItem = require("../models/resMenuItemModel");
const User = require("../models/userModel");
const ResMenuOrder = require("../models/resMenuOrder");
const { sendMailFunction } = require("../functions/mailFunction");

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
  const reservations = await ResReservation.find({
    userId: req.params.id,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(reservations);
});
const adminGetAllReservations = asyncHandler(async (req, res) => {
  const reservations = await ResReservation.find();
  res.status(200).json(reservations);
});

const getAdminRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({
    user: req.params.user_id,
  });
  res.status(200).json(restaurant);
});

const getRestaurantReservations = asyncHandler(async (req, res) => {
  const reservations = await ResReservation.find({
    restaurantId: req.params.res_id,
  }).sort({
    createdAt: -1,
  });
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
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(menu_items);
});
const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    restaurantId,
    transactionId,
    transactionRef,
    amount,
    orderedItems,
    status,
    isPaid,
    paymentMode,
    deliveryAddress,
  } = req.body;

  if (
    !userId ||
    !restaurantId ||
    !transactionId ||
    !transactionRef ||
    !amount ||
    !orderedItems ||
    !status ||
    !paymentMode ||
    !deliveryAddress
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const order = await ResMenuOrder.create({
    userId,
    restaurantId,
    transactionId,
    transactionRef,
    amount,
    orderedItems,
    deliveryAddress,
    status,
    isPaid,
    paymentMode,
  });
  if (!order) {
    return;
  } else {
    const restaurant = await Restaurant.findById(restaurantId);
    const user = await User.findById(restaurant.user);
    console.log(user);
    await sendMailFunction(
      `${user.email},`,
      "Urgent, Confrim Order",
      "You Just recieve a new Order, Please Login on your Dashboard to Confirm and process the Order. Thanks"
    );
  }
  res.status(201).json(order);
});
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await ResMenuOrder.find({
    userId: req.params.id,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(orders);
});
module.exports = {
  adminAddrestaurant,
  adminGetAllRestaurants,
  adminGetAllReservations,
  addNewReservation,
  getUserReservations,
  addMenuItem,
  getRestaurantMenuItems,
  createOrder,
  getUserOrders,
  getAdminRestaurant,
  getRestaurantReservations,
};
