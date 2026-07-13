import { createPortal } from "react-dom";
import { useEffect } from "react";
import clsx from "clsx";

import Button from "../Button/Button";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.type";

const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  className,
}: ModalProps) => {
  const root = document.getElementById("modal-root");

  if (!isOpen || !root) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.content, className)}
      >
        <Button
          variant="error"
          className={styles.closeButton}
          onClick={onClose}
        >
        X
        </Button>

        <h2>{title}</h2>

        {children}

      </div>
    </div>,
    root
  );
};

export default Modal;