const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  createUserOtherInfo,
  getOtherInfo,
  getUserInfo,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-user-info", protect, createUserOtherInfo);
router.get("/get-user-info", protect, getOtherInfo);
router.get("/profile", protect, getMe);
router.get("/user/:id", protect, getUserInfo);

module.exports = router;
