import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "../../ui";
import { CommentProps } from "../../store/ducks/comments";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../../store/ducks/comments";
import { selectCommentsByTodoId } from "../../store/ducks/comments/selectors";
import { useKeyPress } from "../../hooks/useKeyPress";
import { RootState } from "../../store/store";
import styles from "./Comments.module.scss";
import { CommentsProps } from "./Comments.types";

export const Comments: FC<CommentsProps> = ({ todoId, authorName }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) =>
    selectCommentsByTodoId(state, todoId),
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { newComment: "" },
  });

  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null,
  );
  const [editedCommentText, setEditedCommentText] = useState("");

  const handleAddComment = handleSubmit((data) => {
    if (data.newComment.trim()) {
      const newComment: CommentProps = {
        text: data.newComment,
        author: authorName,
      };
      dispatch(addComment({ todoId, comment: newComment }));
      setValue("newComment", "");
    }
  });

  const handleEditComment = (index: number, text: string) => {
    setEditingCommentIndex(index);
    setEditedCommentText(text);
  };

  const handleSaveComment = () => {
    if (editedCommentText.trim() && editingCommentIndex !== null) {
      dispatch(
        updateComment({
          todoId,
          commentIndex: editingCommentIndex,
          newText: editedCommentText,
        }),
      );
      setEditingCommentIndex(null);
      setEditedCommentText("");
    }
  };

  const handleCancelEditing = () => {
    setEditingCommentIndex(null);
    setEditedCommentText("");
  };

  useKeyPress("Enter", handleSaveComment);
  useKeyPress("Escape", handleCancelEditing);

  return (
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
                  autoFocus
                />
                <Button onClick={handleSaveComment}>Сохранить</Button>
                <Button onClick={handleCancelEditing}>Отмена</Button>
              </>
            ) : (
              <>
                <strong>{comment.author}:</strong>{" "}
                <span onClick={() => handleEditComment(index, comment.text)}>
                  {comment.text}
                </span>
                <Button
                  onClick={() =>
                    dispatch(deleteComment({ todoId, commentIndex: index }))
                  }
                >
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
  );
};
