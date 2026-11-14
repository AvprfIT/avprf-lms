
import express from "express";

import {
  getAllCourses,
  getCourseById,
  getFacultyList,
  createCourse,
  updateCourse,
  deleteCourse,
  getAssignedCourses,
  createCurriculumModules,
  updateCurriculumModules,
  getAssignedCoursesWithModules
} from "../controllers/courseController.js";

import upload from "../middleware/upload.js";

import {
  verifyUserToken,
  authorizeRoles,
} from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// All routes require login
router.use(verifyUserToken);

// Admin-only routes
router.get("/faculty", authorizeRoles("admin"), getFacultyList);
router.get("/", authorizeRoles("admin"), getAllCourses);
router.get("/:id", authorizeRoles("admin"), getCourseById);
router.post("/", authorizeRoles("admin"), upload.single("image"), createCourse);
router.put("/:id", authorizeRoles("admin"), upload.single("image"), updateCourse);
router.delete("/:id", authorizeRoles("admin"), deleteCourse);


// Faculty assigned courses **** faculty Portal ****
router.get( "/faculty/assigned", authorizeRoles("faculty"), getAssignedCourses);
router.post( "/faculty/modules", authorizeRoles("faculty"), createCurriculumModules);
router.put("/faculty/modules/:id", authorizeRoles("faculty"),updateCurriculumModules);
router.get( "/faculty/modules", authorizeRoles("faculty"), getAssignedCoursesWithModules);

export default router;
