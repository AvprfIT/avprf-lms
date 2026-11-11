import express from "express";
import { registerStudent, loginStudent, getStudentProfile, updateStudentProfile  } from "../controllers/studentController.js";
import { verifyStudentToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student Registration API
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", verifyStudentToken, getStudentProfile);
router.put("/profile", verifyStudentToken, updateStudentProfile);

export default router;