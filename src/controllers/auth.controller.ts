import { Request, Response } from "express";
import generateUUID from "../utils/security/generate_uuid";
import { hashPassword, verifyPassword } from "../lib/bcrypt";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendVerificationOTP,
} from "../utils/mail_sender";
import {
  generateTokenJWT,
  verifyTokenJWT,
} from "../utils/security/jwt_security";
import {
  generateSecretOTP,
  verifySecretOTP,
} from "../utils/security/generate_otp";

import schema from "../lib/prisma";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const { fullname, email, password } = req.body;

      const userExists = await schema.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        req.flash(
          "error",
          "Email is already registered. Please use a different email address."
        );
        res.redirect("/register");
        return;
      }

      const hashedPassword = hashPassword(password);

      const user = await schema.user.create({
        data: {
          id: generateUUID(),
          fullname,
          email,
          password: hashedPassword,
        },
      });

      const emailVerification = await schema.emailVerification.create({
        data: {
          id: generateUUID(),
          userId: user.id,
          token: generateTokenJWT(user.email),
        },
        include: {
          user: true,
        },
      });

      const info = await sendVerificationEmail(
        emailVerification.token,
        emailVerification.user.email
      );

      req.flash(
        "success",
        "Registration successful. Please check your email to verify your account."
      );

      console.log("Email Info :", info);

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      req.flash("error", "Failed to register. Please try again later.");
      res.redirect("/register");
    } finally {
      await schema.$disconnect();
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await schema.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const userPassword = user.password;

        const isValidPassword = verifyPassword(userPassword, password);

        if (!isValidPassword) {
          req.flash("error", "Invalid username or password. Please try again.");
          res.redirect("/login");
          return;
        }

        if (!user.verified) {
          req.flash(
            "error",
            "Your account is not active. Please verify your email."
          );
          res.redirect("/login");
          return;
        }

        if (isValidPassword && user.verified) {
          const { secret, otp } = generateSecretOTP();

          console.log("validddd");

          const otpToken = await schema.oTPTokens.create({
            data: {
              id: generateUUID(),
              userId: user.id,
              secret,
            },
          });

          const secretOTP = generateTokenJWT(otpToken.secret);

          sendVerificationOTP(user.email, otp);

          req.flash(
            "success",
            "OTP sent successfully, Please check your email"
          );

          res.redirect(`/verification/${secretOTP}`);
          return;
        }
      }

      req.flash("error", "Invalid username or password. Please try again.");

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      req.flash("error", "Failed to login. Please try again later.");
      res.redirect("/login");
    } finally {
      await schema.$disconnect();
    }
  },
  async logout(req: Request, res: Response) {
    try {
      if (req.session.user) {
        req.session.destroy((err) => {
          console.log(err);
        });

        req.flash("success", "Logout successfully");
        res.redirect("/login");
      }
    } catch (error) {
      res.redirect("/login");
    } finally {
      await schema.$disconnect();
    }
  },
  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;

      const emailVerification = await schema.emailVerification.findUnique({
        where: {
          token: token as string,
        },
      });

      console.log("email verification", emailVerification);

      if (emailVerification) {
        await schema.user.update({
          where: {
            id: emailVerification.userId,
          },
          data: {
            verified: true,
          },
        });
        console.log(emailVerification, token);

        await schema.emailVerification.delete({
          where: {
            id: emailVerification.id,
          },
        });

        req.flash(
          "success",
          "Email verification successful. You can now login to your account."
        );

        res.redirect("/login");
      }
    } catch (error) {
      req.flash(
        "error",
        "Email verification failed. Please try again or contact support."
      );

      res.redirect("/login");
    } finally {
      await schema.$disconnect();
    }
  },

  async verifyOTP(req: Request, res: Response) {
    const { digit1, digit2, digit3, digit4, digit5, digit6, secret } = req.body;

    const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    const secretOTP = verifyTokenJWT(secret) as {
      data: string;
    };

    const otpToken = await schema.oTPTokens.findUnique({
      where: {
        secret: secretOTP.data,
      },
    });

    const userSecretOTP = otpToken?.secret as string;

    const isValidOTP = verifySecretOTP(userSecretOTP, otp);

    if (isValidOTP) {
      req.session.user = {
        secret: otpToken?.userId as string,
      };

      await schema.oTPTokens.delete({
        where: {
          secret: secretOTP.data,
        },
      });

      res.redirect("/dashboard");
      return;
    }
    res.redirect(`/verification/${secret}`);
  },
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await schema.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const token = generateTokenJWT(email);

      const emailVerification = await schema.emailVerification.create({
        data: {
          id: generateUUID(),
          userId: user.id,
          token,
        },
      });

      sendResetPasswordEmail(email, emailVerification.token);
      req.flash("success", "Success to ");
      res.redirect("/login");
      return;
    }

    req.flash("User does'nt exists");

    res.redirect("/login");
  },
  async resetPassword(req: Request, res: Response) {
    const { newPassword, confirmPassword, token } = req.body;

    const emailVerification = await schema.emailVerification.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    if (newPassword.trim() === confirmPassword.trim()) {
      await schema.user.update({
        where: {
          id: emailVerification?.userId,
        },
        data: {
          password: newPassword,
        },
      });

      await schema.emailVerification.delete({
        where: {
          token,
        },
      });
      res.redirect("/login");
    }
  },
};

export default authController;
