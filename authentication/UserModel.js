const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {},
  email: {},
  password: {},
  bio: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  skills: {
    type: Array,
    default: [],
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  causes: [{ type: String }], // Causes they support (e.g., environment, education)
  role: {
    type: String,
    enum: ["volunteer", "organization"],
    default: "volunteer",
  },
  volunteerHours: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  achievements: [{ type: String }],
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  joinedEvents: {
    type: Array,
    default: [],
  },
  helpRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Help" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
