import { Comment } from "../Dask/Dask.types";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  comments: Comment[];
  author: string;
  description?: string;
};

export type CardProps = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  updateTodoTitle: (todoId: number, newTitle: string) => void;
};
