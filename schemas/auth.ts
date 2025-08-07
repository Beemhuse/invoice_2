import { z } from "zod";

const passwordRequirements = {
  minLength: 6,
  maxLength: 50,
  requirements: [
    "at least 6 characters",
    "at least one uppercase letter",
    "at least one lowercase letter",
    "at least one number",
  ],
};

const passwordSchema = z.string()
  .min(passwordRequirements.minLength, {
    message: `Password must be at least ${passwordRequirements.minLength} characters`,
  })
  .max(passwordRequirements.maxLength, {
    message: `Password must be less than ${passwordRequirements.maxLength} characters`,
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number",
  });

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(1, "Password is required"),
});

// Register schema
export const registerSchema = z.object({
  full_name: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, {
      message: "Full name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  company_name: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, {
      message: "Company name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: passwordSchema,
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
// Types for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;