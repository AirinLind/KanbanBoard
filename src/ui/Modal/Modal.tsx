import { FC } from "react";
import "../../styles/App.scss";
import { ModalProps } from "./Modal.types";
import { useEscapeKey } from "../../hooks/useHandleEscapePress";
import { Portal } from "../../hok/Portal";

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEscapeKey(onClose);

  return (
    <Portal>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          {children}
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </Portal>
  );
};
