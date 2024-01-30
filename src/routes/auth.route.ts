import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// /auth
router.post("/send-verification-email", authController.register);
router.post("/send-otp", authController.login);
router.get("/verify-email", authController.verifyEmail);
router.post("/verify-otp", authController.verifyOTP);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/logout", authController.logout);

export default router;
