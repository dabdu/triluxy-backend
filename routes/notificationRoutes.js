const express = require("express");
const {
  getNotificationsByUserId,
  onReadNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:userId").get(protect, getNotificationsByUserId);
router.route("/:notificationId").put(onReadNotification);

module.exports = router;
