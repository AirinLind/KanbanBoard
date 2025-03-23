import { FC } from "react";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types";
import { useEscapeKey } from "../../hooks/useHandleEscapePress";
import { Portal } from "../../hok/Portal";

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEscapeKey(onClose);

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
