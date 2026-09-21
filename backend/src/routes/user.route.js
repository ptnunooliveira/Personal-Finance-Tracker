import express from "express";
import { getUsers, getUser, createUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/authorization.middleware.js";
import { admin } from "../middleware/admin.middleware.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, admin, getUsers);
router.get("/:id", authenticate, authorize, getUser);

// POST Routes
router.post("/", authenticate, admin, createUser);

export default router;