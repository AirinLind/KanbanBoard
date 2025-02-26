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
    updateComment: (todoId: number, commentIndex: number, newText: string) => void;
    deleteComment: (todoId: number, commentIndex: number) => void;
    authorName: string;
    columns: Column[];
  }
  
  