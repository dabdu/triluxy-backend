const express = require("express");
const {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
  addTaxiCar,
  getTaxiRides,
  addTaxiRides,
  addtaxiDriverDetails,
  getTaxiDriversByLocation,
  getDriverByAvailablity,
  getTaxiById,
} = require("../controllers/taxiController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/booking").post(protect, addBooking);
router.route("/bookings/:id").get(protect, getUserTaxiBookings);
router.route("/admin/bookings").get(protect, adminGetAllTaxiBookings);
router.route("/rides").get(protect, getTaxiRides).post(protect, addTaxiRides);
router.route("/add-driver-details").post(protect, addtaxiDriverDetails);
router.route("/details/:id").get(protect, getTaxiById);
router.route("/drivers/:ride_city").get(protect, getTaxiDriversByLocation);
router.route("/drivers-available").get(protect, getDriverByAvailablity);

module.exports = router;
