const express = require("express");
const {
  getHotel,
  createHotel,
  getAllHotels,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getHotel).post(protect, createHotel);
router.route("/allhotels").get(getAllHotels);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
