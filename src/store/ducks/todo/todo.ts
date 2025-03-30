import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentProps } from "../comments";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  columnId: number;
  author: string;
  description?: string;
  comments: CommentProps[];
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
      const todo = {
        ...action.payload,
        comments: action.payload.comments || [],
      };
      state.todos.push(todo);
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

export const { addTodo, updateTodoTitle, deleteTodo, updateTodoDescription } =
  todoSlice.actions;

export default todoSlice.reducer;
