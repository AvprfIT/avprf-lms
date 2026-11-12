import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import db from "./config/database.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

// API welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AVPRF LMS Backend API is running",
  });
});

// Database connection test
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS database_status");

    res.json({
      success: true,
      message: "Backend and MySQL connected successfully",
      database: rows[0].database_status === 1 ? "Connected" : "Error",
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AVPRF LMS Backend running on http://localhost:${PORT}`);
});