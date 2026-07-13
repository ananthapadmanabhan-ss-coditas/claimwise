import type { HTMLAttributes, PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren,HTMLAttributes<HTMLDivElement> 
{
  title: string;
  isOpen: boolean;
  onClose: () => void;
}