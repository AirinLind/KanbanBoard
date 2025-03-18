import { useEffect, useState, useCallback, useMemo } from "react";
import { PopupProps, Comment } from "../types";
import "../styles/App.scss";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Button from "./ui/Button";

const Popup: React.FC<PopupProps> = ({
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
    null
  );
  const [editedCommentText, setEditedCommentText] = useState("");

  const columnTitle = useMemo(
    () =>
      columns.find((col) => col.id === todo.columnId)?.title ||
      "Неизвестная колонка",
    [columns, todo.columnId]
  );

  useEffect(() => {
    setComments([...todo.comments]);
  }, [todo.comments]);

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  }, [closePopup]);

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
      saveFunction: () => void
    ) => {
      if (event.key === "Enter") saveFunction();
    },
    []
  );

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
            : comment
        )
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

  return (
    <Modal onClose={closePopup}>
      <div className="popup-header">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => handleKeyDown(e, handleSaveTitle)}
            autoFocus
          />
        ) : (
          <h2 className="popup-title" onClick={() => setIsEditing(true)}>
            {newTitle}
          </h2>
        )}
        <Button
          className="delete-btn"
          onClick={() => {
            deleteTodo(todo.id);
            closePopup();
          }}
        >
          Удалить
        </Button>
        <Button className="close-btn" onClick={closePopup}>
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
            onKeyDown={(e) => handleKeyDown(e, handleSaveDescription)}
            autoFocus
            className="description-input"
          />
        ) : (
          <p className="description-text" onClick={() => setIsEditingDesc(true)}>
            {description || "Добавить описание..."}
          </p>
        )}
        {description && (
          <Button onClick={() => setDescription("")}>Удалить</Button>
        )}
      </div>

      <div className="comments">
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
                    onKeyDown={(e) => handleKeyDown(e, handleSaveComment)}
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
                      setComments((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
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

export default Popup;
