
import express from "express";
import { 
    loginUser,
    getCurrentUser,
    createFaculty,
    getAllFaculty,
    updateFaculty,
    deleteFaculty

 } from "../controllers/userController.js";
import { verifyUserToken, authorizeRoles } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// Admin / Faculty Login
router.post("/login", loginUser);
router.get("/me", verifyUserToken, getCurrentUser);
router.post("/faculty", verifyUserToken, authorizeRoles("admin"), createFaculty);
router.get("/faculty",verifyUserToken,authorizeRoles("admin"),getAllFaculty);
router.put("/faculty/:id",verifyUserToken,authorizeRoles("admin"),updateFaculty);
router.delete( "/faculty/:id", verifyUserToken, authorizeRoles("admin"), deleteFaculty );

export default router;
