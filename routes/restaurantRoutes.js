const express = require("express");
const {
  adminGetAllRestaurants,
  adminAddrestaurant,
  addNewReservation,
  getUserReservations,
  adminGetAllReservations,
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
module.exports = router;
