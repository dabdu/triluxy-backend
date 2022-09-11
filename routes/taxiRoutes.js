const express = require("express");
const {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
  addTaxiCar,
  getTaxiRides,
  addTaxiRides,
} = require("../controllers/taxiController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/booking").post(protect, addBooking);
router.route("/bookings/:id").get(protect, getUserTaxiBookings);
router.route("/admin/bookings").get(protect, adminGetAllTaxiBookings);
router.route("/rides").get(protect, getTaxiRides).post(protect, addTaxiRides);
// router.route("/admin/add-taxi-car").post(protect, addTaxiCar);

module.exports = router;
