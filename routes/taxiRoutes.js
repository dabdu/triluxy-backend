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
  getTaxiBookingsByLocation,
  getTaxiDriverByUserId,
} = require("../controllers/taxiController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/booking").post(protect, addBooking);
router.route("/admin/bookings").get(protect, adminGetAllTaxiBookings);
router.route("/rides").get(protect, getTaxiRides).post(protect, addTaxiRides);
router.route("/add-driver-details").post(protect, addtaxiDriverDetails);
router
  .route("/bookings/location/:city")
  .get(protect, getTaxiBookingsByLocation);
router.route("/details/:id").get(protect, getTaxiById);
router.route("/drivers/:ride_city").get(protect, getTaxiDriversByLocation);
router.route("/user/driver/:userId").get(protect, getTaxiDriverByUserId);
router.route("/drivers-available").get(protect, getDriverByAvailablity);

module.exports = router;
