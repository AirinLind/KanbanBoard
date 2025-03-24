import { ColumnActionTypes, ColumnState } from "../types/columnTypes";
import { UPDATE_COLUMN_TITLE } from "../actions/columnActions";

const initialState: ColumnState = {
  columns: [
    { id: 1, title: "Todo" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Testing" },
    { id: 4, title: "Done" },
  ],
};

const columnReducer = (
  state = initialState,
  action: ColumnActionTypes,
): ColumnState => {
  switch (action.type) {
    case UPDATE_COLUMN_TITLE:
      return {
        ...state,
        columns: state.columns.map((col) =>
          col.id === action.payload.id
            ? { ...col, title: action.payload.newTitle }
            : col,
        ),
      };

    default:
      return state;
  }
};

export default columnReducer;
