import z from "zod";

export const claimschema=z.object({
  title: z.string().trim().min(1,"title is required"),
  description: z.string().trim().min(1,"description is required"),
  category: z.string().trim().min(1,"category is required"),
  date: z.string().min(1,"Date is required"),
  estimated_cost: z.string().regex(/^\d+$/, "Enter a valid number")
})

export type ClaimFormData = z.infer<typeof claimschema>;
