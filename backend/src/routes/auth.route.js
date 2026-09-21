import express from "express";
import { loginUser, registerUser, getMe } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.get("/me", authenticate,  getMe);

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;