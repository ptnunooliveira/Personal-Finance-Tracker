import express from "express";
import { getDefaultCategories, myCategories } from "../controllers/categories.controller.js";
import { authenticate } from "../middleware/authentication.middleware.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, getDefaultCategories);
router.get("/me", authenticate, myCategories);

export default router;