const Comment = require("./CommentModel");
const Help = require("../HelpReq/HelpRequestModel");

exports.addComment = async (req, res) => {
  try {
    const helpRequestId = req.params.id;
    const { content } = req.body;
    const createdBy = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const newComment = new Comment({
      content,
      createdBy,
      helpRequestId,
    });
    const helpRequest = await Help.findById(helpRequestId);
    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }
    helpRequest.comments.push(newComment._id);

    await helpRequest.save();
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const helpRequestId = req.params.id;
    const helpRequest = await Help.findById(helpRequestId).populate("comments");
    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }
    res.status(200).json(helpRequest.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    comment.content = content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await comment.remove();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
