const express = require("express");
const {
  getNotificationsByUserId,
  onReadNotification,
  unReadCount,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:userId").get(protect, getNotificationsByUserId);
router.route("/:notificationId").put(onReadNotification);
router.route("/unread-counts/:notificationId").put(unReadCount);

module.exports = router;
