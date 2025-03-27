import { PropsWithChildren } from "react";

export type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
} & PropsWithChildren;
