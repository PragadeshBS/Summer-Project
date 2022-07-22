const express = require("express");
const { getUserDetails, createUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserDetails);

module.exports = router;
