import { UserRole } from "@prisma/client";
import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({
    required_error: "Please confirm your password",
  }).min(1, "Please confirm your password"),
  invitationCode: string({
    required_error: "Invitation Code is required",
  }).min(1, "Invitation Code is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const loginUserSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email or password"),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required"
  ),
});

const roleValues: string[] = Object.values(UserRole).map((v) => v);
export const editUserSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  id: string(),
  role: string({ invalid_type_error: "Invalid role" }),
}).refine((data) => roleValues.includes(data.role), {
  path: ["role"],
  message: "Invalid role",
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type EditUserInput = TypeOf<typeof editUserSchema>;
