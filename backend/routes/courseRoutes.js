
import express from "express";

import {
  getAllCourses,
  getCourseById,
  getFacultyList,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import {
  verifyUserToken,
  authorizeRoles,
} from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// All course management routes require Admin login.
router.use(verifyUserToken, authorizeRoles("admin"));

// Faculty dropdown data
router.get("/faculty", getFacultyList);

// Course APIs
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
