import { PrismaClient } from "@prisma/client";
import { UserCreateInput } from "../utils/validators/user_validator";
import { EmailVerificationCreateInput } from "../utils/validators/verification_email_validator";
import { OTPTokensCreateInput } from "../utils/validators/otp_tokens_validator";

export default new PrismaClient().$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = UserCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = UserCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = UserCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = UserCreateInput.parse(args.create);
        args.update = UserCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
    emailVerification: {
      create({ args, query }) {
        args.data = EmailVerificationCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = EmailVerificationCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = EmailVerificationCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = EmailVerificationCreateInput.parse(args.create);
        args.update = EmailVerificationCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
    oTPTokens: {
      create({ args, query }) {
        args.data = OTPTokensCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = OTPTokensCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = OTPTokensCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = OTPTokensCreateInput.parse(args.create);
        args.update = OTPTokensCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
  },
});
