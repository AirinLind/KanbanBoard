import { useState } from "react";
import { Modal, Input, Button } from "../../ui";
import { NamePopupProps } from "./NamePopup.types";

export const NamePopup = ({ setUserName, closePopup }: NamePopupProps) => {
  const [name, setName] = useState("");

  function handleSave() {
    if (name.trim()) {
      setUserName(name.trim());
      closePopup();
    }
  }

  return (
    <Modal onClose={closePopup}>
      <h2>Введите ваше имя</h2>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя..."
      />
      <Button onClick={handleSave}>Сохранить</Button>
    </Modal>
  );
};
