const express = require("express");
const {
  adminGetAllRestaurants,
  adminAddrestaurant,
  addNewReservation,
  getUserReservations,
  adminGetAllReservations,
  addMenuItem,
  getRestaurantMenuItems,
  createOrder,
  getUserOrders,
  getRestaurantReservations,
  getAdminRestaurant,
  onAcceptReservation,
  onDeclineReservation,
  onCheckedIn,
  onCheckedOut,
  getRestaurantOrders,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/admin")
  .get(protect, adminGetAllRestaurants)
  .post(protect, adminAddrestaurant);

router.route("/admin/reservations").get(protect, adminGetAllReservations);
router.route("/reservations").post(protect, addNewReservation);
router.route("/add-menu").post(protect, addMenuItem);
router.route("/order").post(protect, createOrder);
router.route("/admin/accept").put(protect, onAcceptReservation);
router.route("/admin/decline").put(protect, onDeclineReservation);
router.route("/admin/checkin").put(protect, onCheckedIn);
router.route("/admin/checkout").put(protect, onCheckedOut);
router.route("/orders/:id").get(protect, getUserOrders);
router.route("/reservations/:id").get(protect, getUserReservations);
router.route("/menu-items/:id").get(protect, getRestaurantMenuItems);

// Restaurant Admin Routes
router
  .route("/reservations/restaurant/:restaurantId")
  .get(protect, getRestaurantReservations);
router.route("/admin/orders/:restaurantId").get(protect, getRestaurantOrders);
router.route("/admin/:user_id").get(protect, getAdminRestaurant);

module.exports = router;
