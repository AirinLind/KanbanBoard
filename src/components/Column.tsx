import { useState } from "react";
import { Add } from "./Add";
import { Card } from "./Card";
import { Column as ColumnType, Todo } from "../types";
import "../styles/App.scss";
import { Input } from "../ui/Input";

type ColumnProps = {
  column: ColumnType;
  todos: Todo[];
  addTodo: (title: string, columnId: number) => void;
  updateColumnTitle: (id: number, newTitle: string) => void;
  updateTodoTitle: (todoId: number, newTitle: string) => void;
  setSelectedTodo: (todo: Todo | null) => void;
};

export function Column({
  column,
  todos,
  addTodo,
  updateColumnTitle,
  updateTodoTitle,
  setSelectedTodo,
}: ColumnProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(column.title);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function saveTitle() {
    updateColumnTitle(column.id, newTitle);
    setIsEditing(false);
  }

  return (
    <div className="column">
      {isEditing ? (
        <Input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={saveTitle}
          autoFocus
        />
      ) : (
        <h2 className="column-title" onClick={() => setIsEditing(true)}>
          {column.title}
        </h2>
      )}
      <Add addTodo={(title) => addTodo(title, column.id)} />
      <div className="column-content">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            setSelectedTodo={setSelectedTodo}
            updateTodoTitle={updateTodoTitle}
          />
        ))}
      </div>
    </div>
  );
}
