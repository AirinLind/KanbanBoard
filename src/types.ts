export interface Column {
  id: number;
  title: string;
}

export interface Comment {
  text: string;
  author: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  comments: Comment[];
  author: string;
  description?: string;
}

export interface NamePopupProps {
  setUserName: (name: string) => void;
  closePopup: () => void;
}

export interface PopupProps {
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

export interface InputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}