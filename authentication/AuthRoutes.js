const express = require("express");
const {
  Login,
  Register,
  Profile,
  sendVerificationCode,
  Logout,
} = require("./AuthController");
const { IsUser } = require("../middlewares/jwtAuth");
const AuthRoutes = express.Router();

AuthRoutes.post("/sendVerificationCode", sendVerificationCode);
AuthRoutes.post("/login", Login);
AuthRoutes.post("/register", Register);
AuthRoutes.get("/profile", IsUser, Profile);
AuthRoutes.post("/logout", IsUser, Logout);

module.exports = AuthRoutes;
