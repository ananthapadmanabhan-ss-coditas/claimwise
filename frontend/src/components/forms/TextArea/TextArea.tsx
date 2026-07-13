import clsx from "clsx";
import styles from "./TextArea.module.scss";
import type { TextAreaProps } from "./TextArea.types";

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={clsx(styles.textarea, className)}
      {...props}
    />
  );
};

export default TextArea;