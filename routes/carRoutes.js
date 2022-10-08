const express = require("express");
const {
  addCarDetails,
  getCarsByLocation,
  getCarsByAvailablity,
  carBooking,
  getUserBookings,
  getCarById,
  getAllCarBookings,
  getBookingcarOwnerId,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/add-car-details").post(protect, addCarDetails);
router.route("/cars/:ride_city").get(protect, getCarsByLocation);
router.route("/available-cars").get(protect, getCarsByAvailablity);
router.route("/booking").post(protect, carBooking);
router.route("/all-bookings").get(protect, getAllCarBookings);
router.route("/bookings/user/:id").get(protect, getUserBookings);
router.route("/car/:id").get(protect, getCarById);
router.route("/user/:carOwnerId").get(protect, getBookingcarOwnerId);

module.exports = router;
