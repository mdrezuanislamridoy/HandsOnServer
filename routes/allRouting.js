const express = require("express");
const allRouting = express.Router();

const AuthRoutes = require("../authentication/AuthRoutes");
const TeamRoutes = require("../team/TeamRoutes");
const HelpRoutes = require("../help/HelpReq/HelpRoutes");
const CommentRoutes = require("../help/HelpComment/CommentRoutes");
const EventRoutes = require("../event/EventRoutes");

allRouting.use("/auth", AuthRoutes);
allRouting.use("/team", TeamRoutes);
allRouting.use("/help", HelpRoutes);
allRouting.use("/comment", CommentRoutes);
allRouting.use("/event", EventRoutes);

module.exports = allRouting;
