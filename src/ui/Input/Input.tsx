import { FC, forwardRef } from "react";
import { InputProps } from "./Input.types";
import styles from "./Input.module.scss";

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      value,
      placeholder,
      onChange,
      onKeyUp,
      onKeyDown,
      onBlur,
      autoFocus,
      className,
      ...rest
    },
    ref,
  ) => {
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
        ref={ref}
        {...rest}
        className={`${styles["custom-input"]} ${className}`}
      />
    );
  },
);

Input.displayName = "Input";
