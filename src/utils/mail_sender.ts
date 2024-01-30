import { SendMailOptions } from "nodemailer";
import { transport } from "../configs/mail";
import {
  templateVerificationLink,
  templateSendOTP,
  templateForgotPassword,
} from "./common/template_email";
import { generateTokenJWT } from "./security/jwt_security";

async function sendVerificationEmail(token: string, email: string) {
  const verificationLink: string = `http://${process.env.HOST}:${process.env.PORT}/auth/verify-email?token=${token}`;

  const mailOptions: SendMailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Verify Your Email",
    html: templateVerificationLink(verificationLink),
  };

  const info = await transport.sendMail(mailOptions);

  return info;
}

async function sendVerificationOTP(email: string, otp: string) {
  const mailOptions: SendMailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Verify Your Account",
    html: templateSendOTP(otp),
  };

  const info = await transport.sendMail(mailOptions);

  return info;
}

async function sendResetPasswordEmail(email: string, token: string) {
  const resetnLink: string = `http://${process.env.HOST}:${process.env.PORT}/reset-password?token=${token}`;

  const mailOptions: SendMailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Verify Your Account",
    html: templateForgotPassword(email, resetnLink),
  };

  const info = await transport.sendMail(mailOptions);

  return info;
}

export { sendVerificationEmail, sendVerificationOTP, sendResetPasswordEmail };
