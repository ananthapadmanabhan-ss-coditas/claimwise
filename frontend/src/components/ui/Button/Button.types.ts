import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "error" | "success" | "info"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}