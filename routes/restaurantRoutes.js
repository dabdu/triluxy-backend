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
router.route("/orders/:id").get(protect, getUserOrders);
router.route("/reservations/:id").get(protect, getUserReservations);

// Restaurant Admin Routes

router
  .route("/admin/res/reservations/:res_id")
  .get(protect, getRestaurantReservations);
router.route("/admin/:user_id").get(protect, getAdminRestaurant);
router.route("/:id/menu-items").get(protect, getRestaurantMenuItems);

module.exports = router;
