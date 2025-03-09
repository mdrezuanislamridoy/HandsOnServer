const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../authentication/UserModel");

exports.IsUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id).select("-password");
    if (!req.user) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
