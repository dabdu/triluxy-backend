const express = require("express");
const { addNewBooking } = require("../controllers/flightController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/book").post(protect, addNewBooking);

module.exports = router;
