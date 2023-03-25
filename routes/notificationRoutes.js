const express = require("express");
const {
  getNotificationsByUserId,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:userId").get(protect, getNotificationsByUserId);

module.exports = router;
