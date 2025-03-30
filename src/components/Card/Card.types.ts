import { CommentProps } from "../../store/ducks/comments";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  comments: CommentProps[];
  author: string;
  description?: string;
};

export type CardProps = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  updateTodoTitle: (todoId: number, newTitle: string) => void;
};
