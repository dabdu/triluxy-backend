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
    restaurantId: req.params.restaurantId,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json(reservations);
});
const onAcceptReservation = asyncHandler(async (req, res) => {
  console.log("Set");
  const accept = await ResReservation.findByIdAndUpdate(
    req.body.id,
    { status: "CONFIRMED" },
    {
      new: true,
    }
  );
  if (!accept) {
    return;
  } else {
    await sendMailFunction(
      `${req.body.userEmail}`,
      "Reservation Confirmed",
      `Your Reseravtion Accept and Confirm by the Admin on the Time and date booked by You. Thanks`
    );
  }
  res.status(201).send(accept);
});
const onDeclineReservation = asyncHandler(async (req, res) => {
  const decline = await ResReservation.findByIdAndUpdate(
    req.body.id,
    { status: "DECLINED" },
    {
      new: true,
    }
  );
  if (!decline) {
    return;
  } else {
    await sendMailFunction(
      `${req.body.userEmail}`,
      "Reservation  Declined",
      `Your Reservation request was declined by the admin, Sorry for the incoviences. Thanks`
    );
  }
  res.status(201).send(decline);
});
const onCheckedIn = asyncHandler(async (req, res) => {
  const check_in = await ResReservation.findByIdAndUpdate(
    req.body.id,
    { status: "CHECKEDIN" },
    {
      new: true,
    }
  );
  if (!check_in) {
    return;
  } else {
    await sendMailFunction(
      `${req.body.userEmail}`,
      "Reservation In Progress",
      `Your Reservation Has Just started, Have Enjoy your Awesome moment with Us. Thanks`
    );
  }
  res.status(201).send(check_in);
});
const onCheckedOut = asyncHandler(async (req, res) => {
  const check_out = await ResReservation.findByIdAndUpdate(
    req.body.id,
    { status: "CHECKEDOUT" },
    {
      new: true,
    }
  );
  if (!check_out) {
    return;
  } else {
    await sendMailFunction(
      `${req.body.userEmail}`,
      "Reservation  Completed",
      `You have just been checked out, Reservation Completed - Booked, Confirmed, Checked In, Checked Out all Successful. Hope you had a Wonderful moment with us. Thanks`
    );
  }
  res.status(201).send(check_out);
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
const getRestaurantOrders = asyncHandler(async (req, res) => {
  const orders = await ResMenuOrder.find({
    restaurantId: req.params.restaurantId,
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
  getRestaurantOrders,
  getAdminRestaurant,
  getRestaurantReservations,
  onAcceptReservation,
  onDeclineReservation,
  onCheckedIn,
  onCheckedOut,
};
