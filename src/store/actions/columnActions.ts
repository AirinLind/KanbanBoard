export const UPDATE_COLUMN_TITLE = "UPDATE_COLUMN_TITLE";

export const updateColumnTitle = (id: string | number, newTitle: string) => ({
  type: UPDATE_COLUMN_TITLE,
  payload: { id, newTitle },
});
