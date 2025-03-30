import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectTodosState = (state: RootState) => state.todos.todos;

export const selectTodosByColumnId = createSelector(
  [selectTodosState, (_: RootState, columnId: number) => columnId],
  (todos, columnId) => todos.filter((todo) => todo.columnId === columnId),
);
