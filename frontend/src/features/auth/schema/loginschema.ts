import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
});

export const codeSchema=z.object({
  code:z.string().trim().min(6,"OTP has 6 digits")
})

export type EmailFormData = z.infer<typeof emailSchema>;
export type CodeFormData = z.infer<typeof codeSchema>