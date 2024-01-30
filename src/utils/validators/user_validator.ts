import { Prisma } from "@prisma/client";
import { z } from "zod";

const UserCreateInput = z.object({
  id: z.string(),
  fullname: z.string().max(100),
  email: z.string().max(100).email(),
  password: z.string().max(1000),
  verified: z.boolean().default(false),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

export { UserCreateInput };
