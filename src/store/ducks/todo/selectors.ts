import { RootState } from "../../store";
import { Todo } from "./todo";

export const selectTodos = (state: RootState): Todo[] => state.todos.todos;

export const selectTodoById =
  (id: number) =>
  (state: RootState): Todo | undefined =>
    state.todos.todos.find((todo: Todo) => todo.id === id);
