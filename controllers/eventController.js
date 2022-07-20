const Event = require("../models/eventModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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

const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).error({ error: "No such event" });
  }
  const event = await Event.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!event) {
    return res.status(400).error({ error: "No such event" });
  }
  res.status(200).json(event);
};

const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

const getParticipants = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).error({ error: "No such event" });
  }
  const event = await Event.findById(id).populate("participants");
  if (!event) {
    return res.status(400).error({ error: "No such event" });
  }
  await res.status(200).json(event.participants);
};

const addParticipant = async (req, res) => {
  const { id } = req.params;
  const { participantId } = req.body;
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(participantId)
  ) {
    return res.status(400).json({ error: "No such event" });
  }
  // add this participant to the events participants list
  const participant = await User.findById(participantId);
  if (!participant) {
    return res.status(400).error({ error: "No such user" });
  }
  const event = await Event.findOneAndUpdate(
    { _id: id },
    { $push: { participants: participantId } }
  );
  if (!event) {
    return res.status(400).error({ error: "No such event" });
  }

  // add this event to the users' participated events list
  const user = await User.findByIdAndUpdate(participantId, {
    $push: { participatedEvents: id },
  });
  res.status(200).json(event);
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).error({ error: "No such event" });
  }
  const event = await Event.findById(id);
  if (!event) {
    return res.status(400).error({ error: "No such event" });
  }
  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  getParticipants,
  updateEvent,
  addParticipant,
};
