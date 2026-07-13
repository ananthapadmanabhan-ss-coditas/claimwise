import type {
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {}

export interface OptionProps
  extends OptionHTMLAttributes<HTMLOptionElement> {}