import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommentProps = {
  text: string;
  author: string;
};

export type CommentsState = {
  [todoId: number]: CommentProps[];
};

const initialState: CommentsState = {};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ todoId: number; comment: CommentProps }>,
    ) => {
      const { todoId, comment } = action.payload;
      if (!state[todoId]) state[todoId] = [];
      state[todoId].push(comment);
    },
    updateComment: (
      state,
      action: PayloadAction<{
        todoId: number;
        commentIndex: number;
        newText: string;
      }>,
    ) => {
      const { todoId, commentIndex, newText } = action.payload;
      if (state[todoId]?.[commentIndex]) {
        state[todoId][commentIndex].text = newText;
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ todoId: number; commentIndex: number }>,
    ) => {
      const { todoId, commentIndex } = action.payload;
      if (state[todoId]) {
        state[todoId].splice(commentIndex, 1);
      }
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
