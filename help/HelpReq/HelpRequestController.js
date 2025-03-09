const Help = require("./HelpRequestModel");
const User = require("../../authentication/UserModel");

exports.createHelpRequest = async (req, res) => {
  try {
    const { title, description, urgency, comments } = req.body;
    const createdBy = req.user._id;
    if (!title || !description || !urgency || !comments) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHelpRequest = new Help({
      title,
      description,
      urgency,
      createdBy,
    });
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.helpRequests.push(newHelpRequest._id);
    await newHelpRequest.save();
    res.status(201).json(newHelpRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await Help.find();
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHelpRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const helpRequest = await Help.findById(id);
    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }
    res.status(200).json(helpRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
