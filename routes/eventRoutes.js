const express = require("express");
const {
  getEvents,
  createEvent,
  getEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", createEvent);

module.exports = router;
