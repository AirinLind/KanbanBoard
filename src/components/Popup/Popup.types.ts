import { Todo } from "../Card/Card.types";
import { ColumnType } from "../Column/Column.types";
import { Comment } from "../Dask/Dask.types";

export type PopupProps = {
  todo: Todo;
  closePopup: () => void;
  addComment: (todoId: number, comment: Comment) => void;
  updateTodoTitle: (todoId: number, title: string) => void;
  updateTodoDescription: (todoId: number, description: string) => void;
  deleteTodo: (todoId: number) => void;
  updateComment: (
    todoId: number,
    commentIndex: number,
    newText: string
  ) => void;
  deleteComment: (todoId: number, commentIndex: number) => void;
  authorName: string;
  columns: ColumnType[];
};