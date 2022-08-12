const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  createUserOtherInfo,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-user-info", protect, createUserOtherInfo);
router.get("/profile", protect, getMe);

module.exports = router;
