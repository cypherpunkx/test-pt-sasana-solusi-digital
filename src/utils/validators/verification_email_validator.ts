import { Prisma } from "@prisma/client";
import { z } from "zod";

const EmailVerificationCreateInput = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
}) satisfies z.Schema<Prisma.EmailVerificationUncheckedCreateInput>;

export { EmailVerificationCreateInput };
