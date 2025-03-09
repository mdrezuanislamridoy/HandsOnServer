const express = require("express");
const {
  CreateTeam,
  GetAllTeams,
  GetTeam,
  JoinTeam,
  inviteUser,
} = require("./TeamController");
const TeamRoutes = express.Router();
const { IsUser } = require("../middlewares/jwtAuth");

TeamRoutes.post("/create", IsUser, CreateTeam);
TeamRoutes.get("/", IsUser, GetAllTeams);
TeamRoutes.get("/:id", IsUser, GetTeam);
TeamRoutes.post("/join/:teamId", IsUser, JoinTeam);
TeamRoutes.post("/invite/:teamId", IsUser, inviteUser);

module.exports = TeamRoutes;
