import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "../Column/Column";
import { Popup } from "../Popup/Popup";
import { NamePopup } from "../NamePopup/NamePopup";
import { Todo } from "../Card/Card.types";
import { ColumnType } from "../Column/Column.types";
import { CommentProps } from "../../store/ducks/comments";
import { RootState } from "../../store/store";
import {
  addTodo,
  updateTodoTitle,
  deleteTodo,
  updateTodoDescription,
} from "../../store/ducks/todo";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../../store/ducks/comments";
import { setUserName } from "../../store/ducks/user";
import { updateColumnTitle } from "../../store/ducks/column";
import styles from "./Dask.module.scss";

export function Dask() {
  const columns = useSelector((state: RootState) => state.columns.columns);
  const userName = useSelector((state: RootState) => state.user.userName);
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

  function addCommentHandler(todoId: number, comment: CommentProps) {
    dispatch(addComment({ todoId, comment }));
  }

  function updateCommentHandler(
    todoId: number,
    commentIndex: number,
    newText: string,
  ) {
    dispatch(updateComment({ todoId, commentIndex, newText }));
  }

  function deleteCommentHandler(todoId: number, commentIndex: number) {
    dispatch(deleteComment({ todoId, commentIndex }));
  }

  function deleteTodoHandler(todoId: number) {
    dispatch(deleteTodo(todoId));
    setSelectedTodo(null);
  }

  function updateColumnTitleHandler(id: number, newTitle: string) {
    dispatch(updateColumnTitle({ id, newTitle }));
  }

  function updateTodoTitleHandler(todoId: number, newTitle: string) {
    dispatch(updateTodoTitle({ id: todoId, newTitle }));
  }

  function updateTodoDescriptionHandler(
    todoId: number,
    newDescription: string,
  ) {
    dispatch(updateTodoDescription({ id: todoId, newDescription }));
  }

  const closeNamePopup = () => setShowNamePopup(false);

  return (
    <div className={styles.board}>
      <div className={styles.columns}>
        {columns.map((col: ColumnType) => (
          <Column
            key={col.id}
            columnId={col.id}
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
          setUserName={(name: string) => dispatch(setUserName(name))}
          closePopup={closeNamePopup}
        />
      )}
    </div>
  );
}
