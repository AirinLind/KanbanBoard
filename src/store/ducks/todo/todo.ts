import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Comment = {
  text: string;
  author: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  comments: Comment[];
  author: string;
  description?: string;
};

export type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodoTitle: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>,
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTitle;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    addComment: (
      state,
      action: PayloadAction<{ todoId: number; comment: Comment }>,
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.todoId);
      if (todo) {
        todo.comments.push(action.payload.comment);
      }
    },
    updateComment: (
      state,
      action: PayloadAction<{
        todoId: number;
        commentIndex: number;
        newText: string;
      }>,
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.todoId);
      if (todo && todo.comments[action.payload.commentIndex]) {
        todo.comments[action.payload.commentIndex].text =
          action.payload.newText;
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ todoId: number; commentIndex: number }>,
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.todoId);
      if (todo) {
        todo.comments.splice(action.payload.commentIndex, 1);
      }
    },
    updateTodoDescription: (
      state,
      action: PayloadAction<{ id: number; newDescription: string }>,
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.description = action.payload.newDescription;
      }
    },
  },
});

export const {
  addTodo,
  updateTodoTitle,
  deleteTodo,
  addComment,
  updateComment,
  deleteComment,
  updateTodoDescription,
} = todoSlice.actions;

export default todoSlice.reducer;
