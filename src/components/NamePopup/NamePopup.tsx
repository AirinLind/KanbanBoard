import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/actions/userActions";
import { Modal, Input, Button } from "../../ui";
import { NamePopupProps } from "./NamePopup.types";
import styles from "./NamePopup.module.scss";

export const NamePopup = ({ closePopup }: NamePopupProps) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleSave() {
    if (name.trim()) {
      dispatch(setUserName(name.trim()));
      closePopup();
    }
  }

  return (
    <Modal onClose={closePopup}>
      <h2>Введите ваше имя</h2>
      <div className={styles.container}>
        <Input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя..."
        />
        <Button onClick={handleSave}>Сохранить</Button>
      </div>
    </Modal>
  );
};
