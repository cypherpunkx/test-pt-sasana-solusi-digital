import { Request, Response } from "express";
import { verifyTokenJWT } from "../utils/security/jwt_security";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const viewController = {
  index(req: Request, res: Response) {
    const messages = req.flash("success", "Login successful. Welcome back!");

    if (req.session.user) {
      res.render("dashboard", {
        layout: "layouts/main-layout",
        title: "Dashboard",
        messages,
      });
      return;
    }

    req.flash("success", "Please login to access dashboard");

    res.redirect("/login");
  },
  register(req: Request, res: Response) {
    const messages = req.flash("success") || req.flash("error");

    console.log(messages);

    res.render("auth/register", {
      layout: "layouts/main-layout",
      title: "Register",
      messages,
    });
  },
  login(req: Request, res: Response) {
    const messages = req.flash("success") || req.flash("error");

    console.log(messages);

    res.render("auth/login", {
      layout: "layouts/main-layout",
      title: "Login",
      messages,
    });
  },
  verification(req: Request, res: Response) {
    const { secret } = req.params;

    const messages = req.flash("success") || req.flash("error");

    res.render("auth/verification", {
      layout: "layouts/main-layout",
      title: "Verification",
      messages,
      secret,
    });
  },
  forgotPassword(req: Request, res: Response) {
    res.render("auth/forgot-password", {
      layout: "layouts/main-layout",
      title: "Forgot Password",
    });
  },

  async resetPassword(req: Request, res: Response) {
    const { token } = req.query;

    const emailVerification = await prisma.emailVerification.findUnique({
      where: {
        token: token as string,
      },
      include: {
        user: true,
      },
    });

    const user = verifyTokenJWT(emailVerification?.token!) as {
      data: string;
    };

    res.render("auth/reset-password", {
      layout: "layouts/main-layout",
      title: "Reset Password",
      token,
    });
  },
};

export default viewController;
