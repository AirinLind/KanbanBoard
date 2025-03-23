import { FC } from "react";
import { InputProps } from "./Input.types";
import styles from "./Input.module.scss";

export const Input: FC<InputProps> = ({
  type = "text",
  value,
  placeholder,
  onChange,
  onKeyUp,
  onKeyDown,
  onBlur,
  autoFocus,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={styles["custom-input"]}
    />
  );
};
