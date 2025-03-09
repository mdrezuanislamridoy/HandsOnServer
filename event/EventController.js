const Event = require("./EventModel");
const User = require("../authentication/UserModel");

exports.CreateEvent = async (req, res) => {
  try {
    const { organizer } = req.user;
    const { title, description, date, time, location, category } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !category ||
      !organizer
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      organizer,
    });
    await newEvent.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already attending this event" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.joinedEvents.push(eventId);

    event.attendees.push(userId);

    await event.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
