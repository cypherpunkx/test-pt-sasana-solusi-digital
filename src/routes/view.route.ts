import { Router } from "express";
import viewController from "../controllers/view.controller";

const router = Router();

router.get("/dashboard", viewController.index);
router.get("/register", viewController.register);
router.get("/login", viewController.login);
router.get("/verification/:secret", viewController.verification);
router.get("/forgot-password", viewController.forgotPassword);
router.get("/reset-password", viewController.resetPassword);

export default router;
