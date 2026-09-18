import express from "express";
import { getUsers, getUser, createUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUser);

// POST Routes
router.post("/", authenticate, createUser);

export default router;