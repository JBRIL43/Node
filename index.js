require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

// Redirect root to signup page
app.get("/", (req, res) => {
  res.redirect("/signup.html");
});

// Importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

// Mounting routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
