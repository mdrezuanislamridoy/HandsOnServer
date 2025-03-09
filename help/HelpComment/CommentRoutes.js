const express = require("express");
const CommentRouter = express.Router();
const { IsUser } = require("../../middlewares/jwtAuth");

const {
  addComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
} = require("./CommentController");
CommentRouter.post("/create", IsUser, addComment);
CommentRouter.get("/get/:id", IsUser, getComments);
CommentRouter.get("/getComment/:id", IsUser, getComment);
CommentRouter.put("/update/:id", IsUser, updateComment);
CommentRouter.delete("/delete/:id", IsUser, deleteComment);
module.exports = CommentRouter;
