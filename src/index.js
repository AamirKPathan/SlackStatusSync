require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const activityRoutes = require("./routes/activity");
const authRoutes = require("./routes/auth");
const oauthRoutes = require("./routes/oauth");

// REGISTER ROUTES
app.use("/activity", activityRoutes);
app.use("/auth", authRoutes);
app.use("/oauth", oauthRoutes);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("SlackStatusSync API is running");
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});