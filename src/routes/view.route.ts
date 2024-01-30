import { Router } from "express";
import viewController from "../controllers/view.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});
router.get("/dashboard", authenticate, viewController.index);
router.get("/register", viewController.register);
router.get("/login", viewController.login);
router.get("/verification/:secret", viewController.verification);
router.get("/forgot-password", viewController.forgotPassword);
router.get("/reset-password", viewController.resetPassword);

export default router;
