import { useState } from "react";
import { Add } from "../Add/Add";
import { Card } from "../Card/Card";
import { ColumnProps } from "./Column.types";
import { Input } from "../../ui";
import { IconButton } from "../../ui/";
import { Modal } from "../../ui/";
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
  const [newTitle, setNewTitle] = useState<string>(column.title);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function saveTitle() {
    updateColumnTitle(column.id, newTitle);
    setIsModalOpen(false);
  }

  function handleEditClick() {
    setIsModalOpen(true);
  }

  useKeyPress("Enter", () => {
    if (isModalOpen) {
      saveTitle();
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
            <div className={styles.inputContainer}>
              <Input
                className="inputField"
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
                autoFocus
              />
              <button className={styles.saveBtn} onClick={saveTitle}>
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
