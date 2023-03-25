const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const getNotificationsByUserId = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.params.userId,
  });
  res.status(200).json(notifications);
});

module.exports = { getNotificationsByUserId };
