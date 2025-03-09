const express = require("express");
const {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequest,
} = require("./HelpRequestController");
const { IsUser } = require("../../middlewares/jwtAuth");
const HelpRoutes = express.Router();

HelpRoutes.post("/create", IsUser, createHelpRequest);
HelpRoutes.get("/getAll", IsUser, getAllHelpRequests);
HelpRoutes.get("getHelp/:id", IsUser, getHelpRequest);

module.exports = HelpRoutes;
