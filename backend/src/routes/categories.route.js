import express from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { getMyCategories as getMyCategoriesController,
    createPersonalizedCategory as createPersonalizedCategoryController
} from "../controllers/categories.controller.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, getMyCategoriesController);

// POST Routes
router.post("/", authenticate, createPersonalizedCategoryController);

export default router;