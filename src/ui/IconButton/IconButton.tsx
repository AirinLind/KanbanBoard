import { FC } from "react";
import "./IconButton.module.scss";
import { IconButtonProps } from "./IconButton.types";
import styles from "./IconButton.module.scss";

export const IconButton: FC<IconButtonProps> = ({ onClick, className }) => {
  return (
    <button className={`${styles.iconButton} ${className}`} onClick={onClick}>
      Edit
    </button>
  );
};
