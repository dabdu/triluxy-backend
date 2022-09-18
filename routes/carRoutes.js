const express = require("express");
const {
  addCarDetails,
  getCarsByLocation,
  getCarsByAvailablity,
} = require("../controllers/carController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/add-car-details").post(protect, addCarDetails);
router.route("/cars/:ride_city").get(protect, getCarsByLocation);
router.route("/available-cars").get(protect, getCarsByAvailablity);

module.exports = router;
