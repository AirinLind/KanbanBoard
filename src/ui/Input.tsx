import React from "react";
import "../styles/App.scss";
import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
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
      className="custom-input"
    />
  );
};

export default Input;
