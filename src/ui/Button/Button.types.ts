import { PropsWithChildren } from "react";

export type ButtonProps = {
  onClick: () => void;
  className?: string;
} & PropsWithChildren;
