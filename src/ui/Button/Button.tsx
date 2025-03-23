import { FC } from "react";
import { ButtonProps } from "./Button.types";

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
