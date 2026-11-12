
import express from "express";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// Admin / Faculty Login
router.post("/login", loginUser);

export default router;
