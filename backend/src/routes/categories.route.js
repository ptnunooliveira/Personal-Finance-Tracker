import express from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { getMyCategories as getMyCategoriesController,
    createPersonalizedCategory as createPersonalizedCategoryController,
    createDefaultCategory as createDefaultCategoryController,
    updatePersonalizedCategory as updatePersonalizedCategoryController,
    updateDefaultCategory as updatedDefaultCategoryController,
    softDeleteCategory as softDeleteCategoryController,
    getDeletedCategories as getDeletedCategoriesController
} from "../controllers/categories.controller.js";

const router = express.Router();

// GET Routes
router.get("/", authenticate, getMyCategoriesController);
router.get("/deleted", authenticate, getDeletedCategoriesController);

// POST Routes
router.post("/", authenticate, createPersonalizedCategoryController);
router.post("/default", authenticate, admin, createDefaultCategoryController);

// PATCH Routes
router.patch("/:id", authenticate, updatePersonalizedCategoryController);
router.patch("/default/:id", authenticate, admin, updatedDefaultCategoryController);

// DELETE Routes
router.delete("/:id", authenticate, softDeleteCategoryController);


export default router;