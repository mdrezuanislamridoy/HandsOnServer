const express = require("express");
const app = express();
const Database = require("./config/db");
const cors = require("cors");
const allRouting = require("./routes/allRouting");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

Database();

app.use("/api", allRouting);

module.exports = app;
