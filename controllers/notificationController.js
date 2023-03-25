const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const getNotificationsByUserId = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.params.userId,
  });
  res.status(200).json(notifications);
});
const onReadNotification = asyncHandler(async (req, res) => {
  const read = await Notification.findByIdAndUpdate(
    req.params.notificationId,
    { status: "read" },
    {
      new: true,
    }
  );
  res.status(201).send(read);
});

module.exports = { getNotificationsByUserId, onReadNotification };
