const User = require("./UserModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.AppPass,
  },
});

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  console.log(email);

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ error: "Failed to send verification code" });
    } else {
      const token = jwt.sign(
        { email, verificationCode },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.status(200).json({
        message: "Verification code sent successfully",
        token,
      });
    }
  });
};

exports.Register = async (req, res) => {
  try {
    const { name, password, token, verifyCode, role } = req.body;

    if (!token) {
      return res.status(400).send({ message: "No token provided" });
    }
    if (!name || !password || !role || !verifyCode) {
      return res.status(400).send({ message: "All feilds are required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { email, verificationCode } = decoded;

    if (verificationCode !== verifyCode) {
      return res.status(400).send({ message: "Invalid verification code" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All feilds are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ token, user, message: "Login successful" });
    console.log("Login Success");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Profile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Logout = (req, res) => {
  console.log("Logout");

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "None",
    path: "/api",
  });
  console.log("Logout Success");
  return res.status(200).json({ message: "Logged out successfully" });
};
