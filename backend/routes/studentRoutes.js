import express from "express";
import { registerStudent, loginStudent, getStudentProfile, updateStudentProfile,changeStudentPassword  } from "../controllers/studentController.js";
import { verifyStudentToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerStudent); // Student Registration API
router.post("/login", loginStudent); // Student Login API
router.get("/profile", verifyStudentToken, getStudentProfile); // Get Student Profile API
router.put("/profile", verifyStudentToken, updateStudentProfile); // Update Student Profile API
router.put("/change-password", verifyStudentToken, changeStudentPassword); // Change Student Password API

export default router;