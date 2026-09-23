import express from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { getMyCategories as getMyCategoriesController,
    createPersonalizedCategory as createPersonalizedCategoryController,
    createDefaultCategory as createDefaultCategoryController,
    updatePersonalizedCategory as updatePersonalizedCategoryController,
    updateDefaultCategory as updatedDefaultCategoryController
} from "../controllers/categories.controller.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, getMyCategoriesController);

// POST Routes
router.post("/", authenticate, createPersonalizedCategoryController);
router.post("/default", authenticate, admin, createDefaultCategoryController);

// PATCH Routes
router.patch("/:id", authenticate, updatePersonalizedCategoryController);
router.patch("/default/:id", authenticate, admin, updatedDefaultCategoryController);

export default router;