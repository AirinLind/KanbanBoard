import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import columnReducer from "./columnReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  todos: todoReducer,
  columns: columnReducer,
  user: userReducer,
});

export default rootReducer;
