import { TypeOf, object, string } from "zod";

export const editProfileSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  id: string(),
});

export const changePasswordSchema = object({
  currentPassword: string({ required_error: "Current Password is required" }),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({
    required_error: "Please confirm your password",
  }).min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type EditProfileInput = TypeOf<typeof editProfileSchema>;
export type ChangePasswordInput = TypeOf<typeof changePasswordSchema>;
