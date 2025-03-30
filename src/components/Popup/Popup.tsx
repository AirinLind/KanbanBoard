import { useEffect, useState, useMemo, FC } from "react";
import { useForm } from "react-hook-form";
import { PopupProps } from "./Popup.types";
import styles from "./Popup.module.scss";
import { Modal, Input, Button } from "../../ui";
import { useKeyPress } from "../../hooks/useKeyPress";
import { Comments } from "../Comments/Comments";

export const Popup: FC<PopupProps> = ({
  todo,
  closePopup,
  addComment,
  updateTodoTitle,
  updateTodoDescription,
  deleteTodo,
  updateComment,
  deleteComment,
  authorName,
  columns,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: todo.title,
      description: todo.description || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const columnTitle = useMemo(
    () =>
      columns.find((col) => col.id === todo.columnId)?.title ||
      "Неизвестная колонка",
    [columns, todo.columnId],
  );

  useEffect(() => {
    reset({ title: todo.title, description: todo.description || "" });
  }, [todo, reset]);

  const handleSaveTitle = handleSubmit((data) => {
    if (data.title.trim()) {
      updateTodoTitle(todo.id, data.title);
    } else {
      setValue("title", todo.title);
    }
    setIsEditing(false);
  });

  const handleSaveDescription = handleSubmit((data) => {
    updateTodoDescription(todo.id, data.description);
    setIsEditingDesc(false);
  });

  useKeyPress("Enter", () => {
    if (isEditing) handleSaveTitle();
    if (isEditingDesc) handleSaveDescription();
  });

  return (
    <Modal onClose={closePopup}>
      <div className={styles.popupHeader}>
        {isEditing ? (
          <form onSubmit={handleSaveTitle}>
            <Input
              {...register("title", { required: "Название обязательно" })}
              autoFocus
              onBlur={handleSaveTitle}
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </form>
        ) : (
          <h2 className={styles.popupTitle} onClick={() => setIsEditing(true)}>
            {watch("title")}
          </h2>
        )}
        <Button
          className={styles.deleteBtn}
          onClick={() => {
            deleteTodo(todo.id);
            closePopup();
          }}
        >
          Удалить
        </Button>
      </div>

      <div className="details">
        <p>
          <strong>Колонка:</strong> {columnTitle}
        </p>
        <p>
          <strong>Автор:</strong> {todo.author}
        </p>
      </div>

      <div className="description">
        <h3>Описание</h3>
        {isEditingDesc ? (
          <form onSubmit={handleSaveDescription}>
            <Input
              {...register("description")}
              autoFocus
              onBlur={handleSaveDescription}
            />
          </form>
        ) : (
          <p className="descriptionText" onClick={() => setIsEditingDesc(true)}>
            {watch("description") || "Добавить описание..."}
          </p>
        )}
      </div>

      <Comments
        todoId={todo.id}
        comments={todo.comments}
        addComment={addComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
        authorName={authorName}
      />
    </Modal>
  );
};
