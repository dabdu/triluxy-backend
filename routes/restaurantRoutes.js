const express = require("express");
const {
  adminGetAllRestaurants,
  adminAddrestaurant,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/admin/restaurant")
  .get(protect, adminGetAllRestaurants)
  .post(protect, adminAddrestaurant);

module.exports = router;
