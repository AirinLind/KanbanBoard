import { useEffect, useState, useMemo, FC } from "react";
import { PopupProps } from "./Popup.types";
import { Comment } from "../Dask/Dask.types";
import styles from "./Popup.module.scss";
import { Modal, Input, Button } from "../../ui";
import { useEnterKey } from "../../hooks/useHandleEnterPress";

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
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(todo.comments);
  const [description, setDescription] = useState(todo.description || "");
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
    setComments([...todo.comments]);
  }, [todo.comments]);

  const handleSaveTitle = () => {
    if (newTitle.trim()) {
      updateTodoTitle(todo.id, newTitle);
    } else {
      setNewTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleSaveDescription = () => {
    if (description.trim()) {
      updateTodoDescription(todo.id, description);
    } else {
      setDescription(todo.description || "");
    }
    setIsEditingDesc(false);
  };

  const handleSaveComment = () => {
    if (editedCommentText.trim() && editingCommentIndex !== null) {
      updateComment(todo.id, editingCommentIndex, editedCommentText);
      setComments((prev) =>
        prev.map((comment, index) =>
          index === editingCommentIndex
            ? { ...comment, text: editedCommentText }
            : comment,
        ),
      );
      setEditingCommentIndex(null);
      setEditedCommentText("");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = { text: newComment, author: authorName };
      addComment(todo.id, comment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  useEnterKey(() => {
    if (isEditing) handleSaveTitle();
    if (isEditingDesc) handleSaveDescription();
    if (editingCommentIndex !== null) handleSaveComment();
    if (
      !isEditing &&
      !isEditingDesc &&
      editingCommentIndex === null &&
      newComment.trim()
    ) {
      handleAddComment();
    }
  });

  return (
    <Modal onClose={closePopup}>
      <div className={styles.popupHeader}>
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSaveTitle}
            autoFocus
          />
        ) : (
          <h2 className={styles.popupTitle} onClick={() => setIsEditing(true)}>
            {newTitle}
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
        <Button className={styles.closeBtn} onClick={closePopup}>
          &times;
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleSaveDescription}
            autoFocus
            className="descriptionInput"
          />
        ) : (
          <p className="descriptionText" onClick={() => setIsEditingDesc(true)}>
            {description || "Добавить описание..."}
          </p>
        )}
        {description && (
          <Button onClick={() => setDescription("")}>Удалить</Button>
        )}
      </div>

      <div className={styles.comments}>
        <h3>Комментарии</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              {editingCommentIndex === index ? (
                <>
                  <Input
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    onBlur={handleSaveComment}
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
                  <Button
                    onClick={() => {
                      deleteComment(todo.id, index);
                      setComments((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    Удалить
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Добавить комментарий..."
        />
        <Button onClick={handleAddComment}>Добавить</Button>
      </div>
    </Modal>
  );
};
