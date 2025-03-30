import { CardProps } from "./Card.types";
import styles from "./Card.module.scss";
import { useSelector } from "react-redux";
import { selectCommentsByTodoId } from "../../store/ducks/comments/selectors";
import { RootState } from "../../store/store";

export const Card = ({ todo, setSelectedTodo }: CardProps) => {
  const comments = useSelector((state: RootState) =>
    selectCommentsByTodoId(state, todo.id),
  );

  return (
    <div className={styles.todoCard} onClick={() => setSelectedTodo(todo)}>
      <h2>{todo.title}</h2>
      <p className={styles.commentCount}>💬 {comments.length}</p>
    </div>
  );
};
