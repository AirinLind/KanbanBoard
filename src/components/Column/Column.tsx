import { useState } from "react";
import { useForm } from "react-hook-form";
import { Add } from "../Add/Add";
import { Card } from "../Card/Card";
import { ColumnProps } from "./Column.types";
import { Input } from "../../ui";
import { IconButton } from "../../ui";
import { Modal } from "../../ui";
import styles from "./Column.module.scss";
import { useKeyPress } from "../../hooks/useKeyPress";

export const Column = ({
  column,
  todos,
  addTodo,
  updateColumnTitle,
  updateTodoTitle,
  setSelectedTodo,
}: ColumnProps) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: column.title,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function saveTitle(data: { title: string }) {
    updateColumnTitle(column.id, data.title);
    setIsModalOpen(false);
  }

  function handleEditClick() {
    setIsModalOpen(true);
    setValue("title", column.title);
  }

  useKeyPress("Enter", () => {
    if (isModalOpen) {
      handleSubmit(saveTitle)();
    }
  });

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{column.title}</h2>
        <IconButton onClick={handleEditClick} />
      </div>

      <Add addTodo={(title) => addTodo(title, column.id)} />
      <div className={styles.columnContent}>
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            updateTodoTitle={updateTodoTitle}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h3>Edit Column Title</h3>
            <form
              onSubmit={handleSubmit(saveTitle)}
              className={styles.inputContainer}
            >
              <Input
                className="inputField"
                type="text"
                {...register("title", { required: "Название обязательно" })}
                autoFocus
              />
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
