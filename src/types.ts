export type Column = {
  id: number;
  title: string;
}

export type Comment = {
  text: string;
  author: string;
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  comments: Comment[];
  author: string;
  description?: string;
}

export type NamePopupProps = {
  setUserName: (name: string) => void;
  closePopup: () => void;
}

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
  columns: Column[];
}

export type InputProps = {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
}

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}