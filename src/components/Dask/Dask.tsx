import { useEffect, useState } from "react";
import { Column } from "../Column/Column";
import { Popup } from "../Popup/Popup";
import { NamePopup } from "../NamePopup/NamePopup";
import { ColumnType } from "../Column/Column.types";
import { Todo } from "../Card/Card.types";
import { Comment } from "./Dask.types";
import styles from "./Dask.module.scss";

export function Dask() {
  const defaultColumns: ColumnType[] = [
    { id: 1, title: "Todo" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
  ];

  const localColumns: ColumnType[] = JSON.parse(
    localStorage.getItem("columns") || "[]",
  );
  const [columns, setColumns] = useState<ColumnType[]>(
    localColumns.length > 0 ? localColumns : defaultColumns,
  );
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]"),
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || "",
  );
  const [showNamePopup, setShowNamePopup] = useState<boolean>(!userName);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("columns", JSON.stringify(columns));
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [todos, columns, userName]);

  function addTodo(title: string, columnId: number) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      columnId,
      comments: [],
      author: userName,
    };
    setTodos([...todos, newTodo]);
  }

  function addComment(todoId: number, comment: Comment) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, comments: [...todo.comments, comment] }
          : todo,
      ),
    );
  }

  function updateComment(
    todoId: number,
    commentIndex: number,
    newComment: string,
  ) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              comments: todo.comments.map((comment, index) =>
                index === commentIndex
                  ? { ...comment, text: newComment }
                  : comment,
              ),
            }
          : todo,
      ),
    );
  }

  function deleteComment(todoId: number, commentIndex: number) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              comments: todo.comments.filter(
                (_, index) => index !== commentIndex,
              ),
            }
          : todo,
      ),
    );
  }

  function deleteTodo(todoId: number) {
    setTodos(todos.filter((todo) => todo.id !== todoId));
    setSelectedTodo(null);
  }

  function updateColumnTitle(id: number, newTitle: string) {
    setColumns(
      columns.map((col) => (col.id === id ? { ...col, title: newTitle } : col)),
    );
  }

  function updateTodoTitle(todoId: number, newTitle: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, title: newTitle } : todo,
      ),
    );
  }

  function updateTodoDescription(todoId: number, newDescription: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, description: newDescription } : todo,
      ),
    );
  }

  return (
    <div className={styles.board}>
      <div className={styles.columns}>
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            todos={todos.filter((todo) => todo.columnId === col.id)}
            addTodo={addTodo}
            updateColumnTitle={updateColumnTitle}
            updateTodoTitle={updateTodoTitle}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
      </div>
      {selectedTodo && (
        <Popup
          todo={selectedTodo}
          closePopup={() => setSelectedTodo(null)}
          addComment={addComment}
          updateTodoTitle={updateTodoTitle}
          updateTodoDescription={updateTodoDescription}
          deleteTodo={deleteTodo}
          authorName={userName}
          columns={columns}
          updateComment={updateComment}
          deleteComment={deleteComment}
        />
      )}
      {showNamePopup && (
        <NamePopup
          setUserName={setUserName}
          closePopup={() => setShowNamePopup(false)}
        />
      )}
    </div>
  );
}
