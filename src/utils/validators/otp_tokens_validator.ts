import { Prisma } from "@prisma/client";
import { z } from "zod";

const OTPTokensCreateInput = z.object({
  id: z.string(),
  userId: z.string(),
  secret: z.string(),
}) satisfies z.Schema<Prisma.OTPTokensUncheckedCreateInput>;

export { OTPTokensCreateInput };
