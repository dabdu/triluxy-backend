const express = require("express");
const {
  getHotel,
  createHotel,
  getAllHotels,
  getUserReservations,
  addNewReservation,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getHotel).post(protect, createHotel);
router
  .route("/reservations")
  .get(protect, getUserReservations)
  .post(protect, addNewReservation);
router.route("/allhotels").get(getAllHotels);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
