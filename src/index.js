const express = require("express");
const fs = require("fs");
const marked = require("marked");

const app = express();
app.use(express.json());

// --- docs route ---
app.get("/docs", (req, res) => {
  const md = fs.readFileSync("./public/docs/docs.md", "utf8");
  const html = marked.parse(md);
  res.send(html);
});

// --- activity route ---
const activityRoutes = require("./routes/activity");
app.use("/activity", activityRoutes);

// --- status route ---
const statusRoutes = require("./routes/status");
app.use("/status", statusRoutes);

const historyRoutes = require("./routes/history");
app.use("/history", historyRoutes);

// --- health check ---
app.get("/status", (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});
