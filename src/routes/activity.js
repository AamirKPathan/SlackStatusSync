const express = require("express");
const fs = require("fs");
const router = express.Router();

const DB_PATH = "./src/db/activity.json";

// GET /activity
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  res.json({ activity: data.current });
});

// POST /activity
router.post("/", (req, res) => {
  const newActivity = req.body.activity;

  if (!newActivity) {
    return res.status(400).json({ error: "Missing 'activity' field" });
  }

  const data = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  data.current = newActivity;
  data.history.push({
    activity: newActivity,
    timestamp: Date.now()
  });

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.json({ ok: true, activity: newActivity });
});

module.exports = router;
