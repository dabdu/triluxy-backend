const express = require("express");
const {
  getCategories,
  createCategory,
  getAllCategories,
  getCatRooms,
  createRoom,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, createCategory);
router.route("/allcategories/:id").get(getAllCategories);
router.route("/:id/rooms").get(protect, getCatRooms).post(protect, createRoom);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
 