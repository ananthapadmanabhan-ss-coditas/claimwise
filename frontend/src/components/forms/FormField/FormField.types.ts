import type { PropsWithChildren } from "react";

export interface FormFieldProps extends PropsWithChildren {
  id?: string;
  label?: string;
  error?: string;
  className?: string;
}