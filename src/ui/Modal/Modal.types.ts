import { PropsWithChildren } from "react";

export type ModalProps = {
  onClose: () => void;
} & PropsWithChildren;
