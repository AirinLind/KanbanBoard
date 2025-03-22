import { FC } from "react";
import "../../styles/App.scss";
import { ButtonProps } from "./Button.types";

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
