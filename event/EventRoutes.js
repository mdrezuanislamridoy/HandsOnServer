const express = require("express");
const EventRouter = express.Router();
const { IsUser } = require("../middlewares/jwtAuth");
const {
  joinEvent,
  GetEvent,
  GetAllEvents,
  CreateEvent,
} = require("./EventController");

EventRouter.post("/create", IsUser, CreateEvent);
EventRouter.get("/getAll", IsUser, GetAllEvents);
EventRouter.get("/get/:id", IsUser, GetEvent);
EventRouter.post("/joinEvent/:id", IsUser, joinEvent);

module.exports = EventRouter;
