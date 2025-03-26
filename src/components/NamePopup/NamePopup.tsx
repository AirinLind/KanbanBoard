import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/ducks/user/user";
import { Modal, Input, Button } from "../../ui";
import { NamePopupProps } from "./NamePopup.types";
import styles from "./NamePopup.module.scss";

export const NamePopup = ({ closePopup }: NamePopupProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  function handleSave() {
    const trimmedName = name.trim();
    if (trimmedName) {
      dispatch(setUserName(trimmedName));
      localStorage.setItem("userName", trimmedName);
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
