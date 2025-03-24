import { FC } from "react";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types";
import { useKeyPress } from "../../hooks/useKeyPress";
import { Portal } from "../../hok/Portal";

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useKeyPress("Escape", onClose);

  return (
    <Portal>
      <div className={styles.popupOverlay} onClick={onClose}>
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          {children}
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </Portal>
  );
};
