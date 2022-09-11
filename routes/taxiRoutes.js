const express = require("express");
const {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
  addTaxiCar,
} = require("../controllers/taxiController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/booking").post(protect, addBooking);
router.route("/bookings/:id").get(protect, getUserTaxiBookings);
router.route("/admin/bookings").get(protect, adminGetAllTaxiBookings);
router.route("/admin/add-taxi-car").get(protect, addTaxiCar);

module.exports = router;
