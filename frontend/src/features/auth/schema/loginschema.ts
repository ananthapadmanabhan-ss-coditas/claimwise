import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
});

export const otpSchema=z.object({
  otp:z.string().trim().min(6,"OTP has 6 digits")
})

export type EmailFormData = z.infer<typeof emailSchema>;
export type OTPFormData = z.infer<typeof otpSchema>