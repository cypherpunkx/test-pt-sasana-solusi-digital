import type { Request, Response, NextFunction } from "express";
import { hashPassword } from "../lib/bcrypt";
import generateUUID from "../utils/security/generate_uuid";

interface UserRequest extends Request {
  user: {
    id: string;
    fullname: string;
    email: string;
    password: string;
  };
}

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  const { fullname, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  (req as UserRequest).user = {
    id: generateUUID(),
    fullname: fullname.trim(),
    email: email.trim(),
    password: hashedPassword,
  };

  next();
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.session.user) {
      return next();
    }
    res.redirect("/login");
  } catch (error) {
    console.log("error");
    req.flash("error", "Login failed, Please register your account");
    res.redirect("/login");
  }
}

export { verifyUser, authenticate };
