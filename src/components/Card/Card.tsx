import { CardProps } from "./Card.types";
import styles from "./Card.module.scss";

export const Card = ({ todo, setSelectedTodo }: CardProps) => {
  return (
    <div className={styles.todoCard} onClick={() => setSelectedTodo(todo)}>
      <h2>{todo.title}</h2>
      <p className={styles.commentCount}>💬 {todo.comments.length}</p>
    </div>
  );
};
