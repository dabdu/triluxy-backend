const express = require("express");
const { initiateAdmin, adminLogin } = require("../controllers/adminController");
const router = express.Router();

router.post("/initiate", initiateAdmin);
router.post("/login", adminLogin);

module.exports = router;
