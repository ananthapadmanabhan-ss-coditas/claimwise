import clsx from "clsx";
import styles from "./Select.module.scss";
import type { OptionProps, SelectProps } from "./Select.types";

const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select
      className={clsx(styles.select, className)}
      {...props}
    >
      {children}
    </select>
  );
};

Select.Option = ({ children, ...props }: OptionProps) => (
  <option {...props}>{children}</option>
);

export default Select;