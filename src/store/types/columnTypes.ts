import { UPDATE_COLUMN_TITLE } from "../actions/columnActions";

export type Column = {
  id: number;
  title: string;
};

export type ColumnState = {
  columns: {
    id: number;
    title: string;
  }[];
};

export type UpdateColumnTitleAction = {
  type: typeof UPDATE_COLUMN_TITLE;
  payload: {
    id: number;
    newTitle: string;
  };
};

export type ColumnActionTypes = UpdateColumnTitleAction;
