import { useEffect, useState, useMemo, FC } from "react";
import { useForm } from "react-hook-form";
import { PopupProps } from "./Popup.types";
import { Comment } from "../Dask/Dask.types";
import styles from "./Popup.module.scss";
import { Modal, Input, Button } from "../../ui";
import { useKeyPress } from "../../hooks/useKeyPress";

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
      newComment: "",
      comments: todo.comments,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null,
  );
  const [editedCommentText, setEditedCommentText] = useState("");

  const columnTitle = useMemo(
    () =>
      columns.find((col) => col.id === todo.columnId)?.title ||
      "Неизвестная колонка",
    [columns, todo.columnId],
  );

  useEffect(() => {
    reset({
      title: todo.title,
      description: todo.description || "",
      newComment: "",
      comments: todo.comments,
    });
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

  const handleAddComment = handleSubmit((data) => {
    if (data.newComment.trim()) {
      const newComment: Comment = { text: data.newComment, author: authorName };
      const updatedComments = [...watch("comments"), newComment];

      setValue("comments", updatedComments);
      addComment(todo.id, newComment);
      setValue("newComment", "");
    }
  });

  const handleSaveComment = () => {
    if (editedCommentText.trim() && editingCommentIndex !== null) {
      const updatedComments = watch("comments").map((comment, index) =>
        index === editingCommentIndex
          ? { ...comment, text: editedCommentText }
          : comment,
      );

      setValue("comments", updatedComments);
      updateComment(todo.id, editingCommentIndex, editedCommentText);
      setEditingCommentIndex(null);
      setEditedCommentText("");
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = watch("comments").filter((_, i) => i !== index);
    setValue("comments", updatedComments);
    deleteComment(todo.id, index);
  };

  useKeyPress("Enter", () => {
    if (isEditing) handleSaveTitle();
    if (isEditingDesc) handleSaveDescription();
    if (editingCommentIndex !== null) handleSaveComment();
    if (!isEditing && !isEditingDesc && editingCommentIndex === null) {
      handleAddComment();
    }
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

      <div className={styles.comments}>
        <h3>Комментарии</h3>
        <ul>
          {watch("comments").map((comment, index) => (
            <li key={index}>
              {editingCommentIndex === index ? (
                <>
                  <Input
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    autoFocus
                  />
                  <Button onClick={handleSaveComment}>Сохранить</Button>
                </>
              ) : (
                <>
                  <strong>{comment.author}:</strong>{" "}
                  <span
                    onClick={() => {
                      setEditingCommentIndex(index);
                      setEditedCommentText(comment.text);
                    }}
                  >
                    {comment.text}
                  </span>
                  <Button onClick={() => handleDeleteComment(index)}>
                    Удалить
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddComment}>
          <Input
            {...register("newComment")}
            placeholder="Добавить комментарий..."
          />
          <Button type="submit">Добавить</Button>
        </form>
      </div>
    </Modal>
  );
};
