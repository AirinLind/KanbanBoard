import {
  AddComment,
  UpdateComment,
  DeleteComment,
} from "../Comments/Comments.types";
import { Todo } from "../Card/Card.types";
import { ColumnType } from "../Column/Column.types";

export type PopupProps = {
  todo: Todo;
  closePopup: () => void;
  addComment: AddComment;
  updateTodoTitle: (todoId: number, title: string) => void;
  updateTodoDescription: (todoId: number, description: string) => void;
  deleteTodo: (todoId: number) => void;
  updateComment: UpdateComment;
  deleteComment: DeleteComment;
  authorName: string;
  columns: ColumnType[];
};
