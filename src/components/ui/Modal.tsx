import React from "react";
import ReactDOM from "react-dom";
import "../../styles/App.scss";
import { ModalProps } from "../../types";

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
