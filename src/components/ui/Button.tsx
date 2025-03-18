import React from "react";
import "../../styles/App.scss";
import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "" }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
