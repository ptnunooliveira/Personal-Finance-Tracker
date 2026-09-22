import express from "express";
import { authenticate } from "../middleware/authentication.middleware.js";
import { login as loginController,
    register as registerController,
    getMe as getMeController
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", authenticate,  getMeController);

router.post("/login", loginController);
router.post("/register", registerController);

export default router;