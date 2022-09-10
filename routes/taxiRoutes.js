const express = require("express");
const {
  addBooking,
  getUserTaxiBookings,
  adminGetAllTaxiBookings,
} = require("../controllers/taxiController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/booking")
  .get(protect, getUserTaxiBookings)
  .post(protect, addBooking);
router.route("/admin/bookings").get(protect, adminGetAllTaxiBookings);

module.exports = router;
