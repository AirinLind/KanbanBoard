import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectCommentsState = (state: RootState) => state.comments;

export const selectCommentsByTodoId = createSelector(
  [selectCommentsState, (_: RootState, todoId: number) => todoId],
  (comments, todoId) => comments[todoId] ?? [],
);
