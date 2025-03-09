const Team = require("./TeamModel");
const User = require("../authentication/UserModel");

exports.CreateTeam = async (req, res) => {
  try {
    const { name, description, type } = req.body;
    const { createdBy } = req.user._id;

    if (!name || !description || !type || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTeam = new Team({
      name,
      description,
      type,
      createdBy,
    });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.JoinTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user._id;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (team.members.includes(userId)) {
      return res.status(400).json({
        message: "You are already a member of this team",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.teams.push(teamId);
    team.members.push(userId);

    await team.save();
    res.status(200).json({ message: "You have joined the team" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.inviteUser = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.user._id;
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!team.invitations.includes(userId)) {
      team.invitations.push(userId);
      await team.save();
      res.status(200).json({ message: "User invited successfully" });
    } else {
      res.status(400).json({ message: "User already invited" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
