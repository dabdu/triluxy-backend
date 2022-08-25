const express = require("express");
const {
  getCategories,
  createCategory,
  getAllCategories,
  getCatRooms,
  createRoom,
  getCatById,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, createCategory);
router.route("/allcategories/:id").get(getAllCategories);
router.route("/add-room").post(protect, createRoom);
router.route("/:id/rooms").get(protect, getCatRooms)
router.route("/room/:id").get(protect, getCatById);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
 