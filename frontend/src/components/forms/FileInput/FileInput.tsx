import { useId } from "react";
import clsx from "clsx";
import styles from "./FileUpload.module.scss";
import type { FileUploadProps } from "./FileInput.types";

const FileUpload = ({ id, className, ...props }: FileUploadProps) => {
  const generatedId = id ?? useId();

  return (
    <input
      id={generatedId}
      type="file"
      className={clsx(styles.fileInput, className)}
      {...props}
    />
  );
};

export default FileUpload;