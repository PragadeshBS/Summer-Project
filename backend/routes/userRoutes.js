const express = require("express");
const { getUserDetails, createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/:username", getUserDetails);

router.post("/", createUser);

module.exports = router;
