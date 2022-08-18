const express = require("express");
const {
  getHotel,
  createHotel,
  getAllHotels,
  getUserReservations,
  addNewReservation,
  adminAddHotel,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");
const { mailFunction } = require("../middleware/mailSender");
const router = express.Router();

router.route("/").get(protect, getHotel).post(protect, createHotel);
router.route("/mail").get(mailFunction);
router
  .route("/reservations")
  .get(protect, getUserReservations)
  .post(protect, addNewReservation);
router.route("/allhotels").get(getAllHotels);
router.route("/admin/add-hotel").post(protect, adminAddHotel);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
