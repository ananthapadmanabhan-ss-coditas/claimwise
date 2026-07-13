import styles from "./Input.module.scss";
import clsx from "clsx";
import type { InputProps } from "./Input.types";

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(styles.input, className)}
      {...props}
    />
  );
};

export default Input;