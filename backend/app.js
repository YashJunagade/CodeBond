const express = require("express");
const cors = require("cors");
const problemRoutes = require("./routes/problemRoutes");
const authRoutes = require("./routes/auth");
const friendRoutes = require("./routes/friendRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", problemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Coding Problem API");
});

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

module.exports = app;
