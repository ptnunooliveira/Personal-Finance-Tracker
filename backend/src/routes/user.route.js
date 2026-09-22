import express from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/authorization.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { getAllUsers as getAllUsersController,
    getUserById as getUserByIdController,
    createUser as createUserController } from "../controllers/user.controller.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, admin, getAllUsersController);
router.get("/:id", authenticate, authorize, getUserByIdController);

// POST Routes
router.post("/", authenticate, admin, createUserController);

export default router;