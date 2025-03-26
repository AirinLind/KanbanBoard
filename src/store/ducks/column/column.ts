import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Column = {
  id: number;
  title: string;
};

export type ColumnState = {
  columns: Column[];
};

const initialState: ColumnState = {
  columns: [
    { id: 1, title: "Todo" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
  ],
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    updateColumnTitle: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>,
    ) => {
      const column = state.columns.find((col) => col.id === action.payload.id);
      if (column) {
        column.title = action.payload.newTitle;
      }
    },
  },
});

export const { updateColumnTitle } = columnSlice.actions;
export default columnSlice.reducer;
