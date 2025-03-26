import { RootState } from "../../store";
import { Column, ColumnState } from "./column";

export const selectColumns = (state: RootState): ColumnState["columns"] =>
  state.columns.columns;

export const selectColumnById =
  (id: number) =>
  (state: RootState): Column | undefined =>
    state.columns.columns.find((col: Column) => col.id === id);
