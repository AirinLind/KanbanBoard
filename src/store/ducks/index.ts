import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import * as duckColumns from "./column";
import * as duckTodos from "./todo";
import * as duckUser from "./user";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  columns: duckColumns.reducer,
  todos: duckTodos.reducer,
  user: duckUser.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
