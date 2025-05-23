import { z } from "zod";
import { UserStatus } from "./user.constant";

const userValidationSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password must be at most 20 characters long" })
    .optional(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
