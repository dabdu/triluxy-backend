const express = require("express");
const {
  adminGetAllRestaurants,
  adminAddrestaurant,
  addNewReservation,
  getUserReservations,
  adminGetAllReservations,
  addMenuItem,
  getRestaurantMenuItems,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/admin")
  .get(protect, adminGetAllRestaurants)
  .post(protect, adminAddrestaurant);

router.route("/admin/reservations").get(protect, adminGetAllReservations);
router.route("/reservations/:id").get(protect, getUserReservations);
router.route("/reservations").post(protect, addNewReservation);
router.route("/add-menu").post(protect, addMenuItem);
router.route("/:id/menu-items").get(protect, getRestaurantMenuItems);
module.exports = router;
