import { CardProps } from "./Card.types";
import "../../styles/App.scss";

export const Card = ({ todo, setSelectedTodo }: CardProps) => {
  return (
    <div className="todo_card" onClick={() => setSelectedTodo(todo)}>
      <h2>{todo.title}</h2>
      <p className="comment-count">💬 {todo.comments.length}</p>
    </div>
  );
};