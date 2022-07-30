const Event = require("../models/eventModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const Joi = require("joi");
const EventImage = require("../models/eventImageModel");

const createEvent = async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
    image,
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
      image,
      organisers: [req.user.id],
    });
    const user = await User.findByIdAndUpdate(req.user.id, {
      $push: { organizedEvents: event._id },
    });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such event" });
  }
  const { error } = validateEvent(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newEvent = { ...req.body };
  if (newEvent["image"] === "") {
    newEvent["image"] = null;
  }
  const event = await Event.findOneAndUpdate({ _id: id }, newEvent);
  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }
  res.status(200).json(event);
};

const uploadEventImage = async (req, res) => {
  const image = {
    data: new Buffer.from(req.file.buffer, "base64"),
    contentType: req.file.mimetype,
  };
  const savedImage = await EventImage.create({ image });
  res.send(savedImage);
};

const getEventImage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such event" });
  }
  const event = await Event.findById(id).populate("image");
  if (!event || !event.image) {
    return res.status(400).json({ error: "No such event image" });
  }
  res.set("Content-type", event.image.contentType);
  res.send(event.image.image.data);
};

const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });
  res.status(200).json(events);
};

const getUpcomingEvents = async (req, res) => {
  const events = await Event.find({}).where("eventEndDate").gte(new Date());
  res.status(200).json(events);
};

const getParticipants = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such event" });
  }
  const event = await Event.findById(id).populate("participants");
  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }
  await res.status(200).json(event.participants);
};

const addParticipant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id) || !participantEmail) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const event = await Event.findByIdAndUpdate(id, {
    $push: { participants: req.user._id },
  });
  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }
  // add this event to the users' participated events list
  const user = await User.findByIdAndUpdate(req.user.id, {
    $push: { participatedEvents: id },
  });
  res.status(200).json(event);
};

const getEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such event" });
  }
  const event = await Event.findById(id)
    .populate("organisers")
    .populate("participants");
  if (!event) {
    return res.status(400).json({ error: "No such event" });
  }
  res.status(200).json(event);
};

const checkConflictingEvents = async (req, res) => {
  const { from, to } = req.body;
  const conflictingEvents = await Event.find({})
    .where("eventStartDate")
    .lt(to)
    .where("eventEndDate")
    .gt(from);
  res.status(200).json({
    conflict: conflictingEvents.length ? true : false,
    events: conflictingEvents,
  });
};

const validateEvent = (data) => {
  const schema = Joi.object({
    eventName: Joi.string().required().label("Event name"),
    eventStartDate: Joi.date().required().label("Event startDate"),
    eventEndDate: Joi.date().label("Event end Date"),
    venue: Joi.string().required().label("Venue"),
    dept: Joi.string().empty("").label("Dept"),
    contactName: Joi.string().required().label("Contact name"),
    contactPhone: Joi.string().empty("").label("Contact phone"),
    contactEmail: Joi.string().email().empty("").label("Contact email"),
    otherInfo: Joi.string().empty("").label("Other Info"),
    image: Joi.string().empty("").label("Event image"),
  });
  return schema.validate(data);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  getUpcomingEvents,
  getParticipants,
  updateEvent,
  addParticipant,
  uploadEventImage,
  getEventImage,
  checkConflictingEvents,
};
