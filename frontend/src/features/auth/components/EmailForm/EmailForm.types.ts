import type { Dispatch, SetStateAction } from "react";

export interface EmailFormProp{
  form:Dispatch<SetStateAction<string>>
  setEmail:Dispatch<SetStateAction<string>>
}