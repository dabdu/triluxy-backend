const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCategories).post(protect, createCategory);
// router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
