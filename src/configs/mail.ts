import nodemailer from "nodemailer";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export { transport };
