import { useState } from "react";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface NamePopupProps {
  setUserName: (name: string) => void;
  closePopup: () => void;
}

function NamePopup({ setUserName, closePopup }: NamePopupProps) {
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
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя..." />
      <Button onClick={handleSave}>Сохранить</Button>
    </Modal>
  );
}

export default NamePopup;
