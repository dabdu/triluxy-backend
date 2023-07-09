const express = require("express");
const { initiateAdmin, adminLogin } = require("../controllers/adminController");
const { adminProtect } = require("../middleware/adminAuthMiddleware");
const {
  GetAllRestaurants,
  GetAllRestaurantAdmins,
} = require("../controllers/admin/restaurantController");
const router = express.Router();

router.post("/initiate", initiateAdmin);
router.post("/login", adminLogin);

// Restraurant Routes

router.get("/res-admin", adminProtect, GetAllRestaurantAdmins);
router.get("/restaurants", adminProtect, GetAllRestaurants);

module.exports = router;
