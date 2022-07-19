const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  const {
    eventName,
    eventStartDate,
    eventEndDate,
    venue,
    dept,
    otherInfo,
    contactName,
    contactPhone,
    contactEmail,
  } = req.body;
  try {
    const event = await Event.create({
      eventName,
      eventStartDate,
      eventEndDate,
      venue,
      dept,
      otherInfo,
      contactName,
      contactPhone,
      contactEmail,
    });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

module.exports = {
  createEvent,
  getEvents,
};
