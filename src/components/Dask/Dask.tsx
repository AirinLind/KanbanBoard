import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "../Column/Column";
import { Popup } from "../Popup/Popup";
import { NamePopup } from "../NamePopup/NamePopup";
import { Todo } from "../Card/Card.types";
import { Comment } from "./Dask.types";
import { updateColumnTitle } from "../../store/actions/columnActions";
import {
  addTodo,
  updateTodoTitle,
  deleteTodo,
  addComment,
  updateComment,
  deleteComment,
  updateTodoDescription,
} from "../../store/actions/todoActions";
import { setUserName } from "../../store/actions/userActions";
import styles from "./Dask.module.scss";

export function Dask() {
  const columns = useSelector((state: any) => state.columns.columns);
  const todos = useSelector((state: any) => state.todos.todos);
  const userName = useSelector((state: any) => state.user.userName);
  const dispatch = useDispatch();

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showNamePopup, setShowNamePopup] = useState<boolean>(!userName);

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  function addTodoHandler(title: string, columnId: number) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      columnId,
      comments: [],
      author: userName,
    };
    dispatch(addTodo(newTodo));
  }

  function addCommentHandler(todoId: number, comment: Comment) {
    dispatch(addComment(todoId, comment));
  }

  function updateCommentHandler(
    todoId: number,
    commentIndex: number,
    newComment: string,
  ) {
    dispatch(updateComment(todoId, commentIndex, newComment));
  }

  function deleteCommentHandler(todoId: number, commentIndex: number) {
    dispatch(deleteComment(todoId, commentIndex));
  }

  function deleteTodoHandler(todoId: number) {
    dispatch(deleteTodo(todoId));
    setSelectedTodo(null);
  }

  function updateColumnTitleHandler(id: number, newTitle: string) {
    dispatch(updateColumnTitle(id, newTitle));
  }

  function updateTodoTitleHandler(todoId: number, newTitle: string) {
    dispatch(updateTodoTitle(todoId, newTitle));
  }

  function updateTodoDescriptionHandler(
    todoId: number,
    newDescription: string,
  ) {
    dispatch(updateTodoDescription(todoId, newDescription));
  }

  const closeNamePopup = () => setShowNamePopup(false);

  return (
    <div className={styles.board}>
      <div className={styles.columns}>
        {columns.map((col: { id: number; title: string }) => (
          <Column
            key={col.id}
            column={col}
            todos={todos.filter((todo: Todo) => todo.columnId === col.id)}
            addTodo={addTodoHandler}
            updateColumnTitle={updateColumnTitleHandler}
            updateTodoTitle={updateTodoTitleHandler}
            setSelectedTodo={setSelectedTodo}
          />
        ))}
      </div>
      {selectedTodo && (
        <Popup
          todo={selectedTodo}
          closePopup={() => setSelectedTodo(null)}
          addComment={addCommentHandler}
          updateTodoTitle={updateTodoTitleHandler}
          updateTodoDescription={updateTodoDescriptionHandler}
          deleteTodo={deleteTodoHandler}
          authorName={userName}
          columns={columns}
          updateComment={updateCommentHandler}
          deleteComment={deleteCommentHandler}
        />
      )}
      {showNamePopup && (
        <NamePopup
          setUserName={(name: string) => dispatch(setUserName(name))} // Dispatch setUserName action
          closePopup={closeNamePopup}
        />
      )}
    </div>
  );
}
