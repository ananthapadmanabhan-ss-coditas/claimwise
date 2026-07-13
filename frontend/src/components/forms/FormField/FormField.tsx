import clsx from "clsx";
import Label from "../../ui/Label/Label";
import Message from "../../feedback/Message/Message";

import styles from "./FormField.module.scss";
import type { FormFieldProps } from "./FormField.types"

const FormField = ({
  id,
  label,
  error,
  className,
  children,
}: FormFieldProps) => {
  return (
    <div className={clsx(styles.formField, className)}>
      {label && (
        <Label htmlFor={id} className={styles.label}>
          {label}
        </Label>
      )}

      {children}

      <Message
        type="Error"
        message={error}
      />
    </div>
  );
};

export default FormField;