import { Todo } from "../Card/Card.types";

export type ColumnType = {
  id: number;
  title: string;
};

export type ColumnProps = {
  columnId: number;
  addTodo: (title: string, columnId: number) => void;
  updateColumnTitle: (id: number, newTitle: string) => void;
  updateTodoTitle: (todoId: number, newTitle: string) => void;
  setSelectedTodo: (todo: Todo | null) => void;
};
