import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUserName } from "../../store/ducks/user/user";
import { Modal, Input, Button } from "../../ui";
import { NamePopupProps } from "./NamePopup.types";
import styles from "./NamePopup.module.scss";

export const NamePopup = ({ closePopup }: NamePopupProps) => {
  const dispatch = useDispatch();
c

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setValue("name", storedName);
    }
  }, [setValue]);

  function handleSave(data: { name: string }) {
    const trimmedName = data.name.trim();
    if (trimmedName) {
      dispatch(setUserName(trimmedName));
      localStorage.setItem("userName", trimmedName);
      closePopup();
    }
  }

  return (
    <Modal onClose={closePopup}>
      <h2>Введите ваше имя</h2>
      <form onSubmit={handleSubmit(handleSave)} className={styles.container}>
        <Input
          className={styles.input}
          {...register("name", { required: "Имя обязательно" })}
          placeholder="Ваше имя..."
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <Button type="submit">Сохранить</Button>
      </form>
    </Modal>
  );
};
