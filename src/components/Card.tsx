import { Todo } from "../types";
import "../styles/App.scss";

type CardProps = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  updateTodoTitle: (todoId: number, newTitle: string) => void;
};

export function Card({ todo, setSelectedTodo }: CardProps) {
  return (
    <div className="todo_card" onClick={() => setSelectedTodo(todo)}>
      <h2>{todo.title}</h2>
      <p className="comment-count">💬 {todo.comments.length}</p>
    </div>
  );
}
