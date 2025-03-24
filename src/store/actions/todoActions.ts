import { Todo, Comment } from "../types/todoTypes";

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO_TITLE = "UPDATE_TODO_TITLE";
export const DELETE_TODO = "DELETE_TODO";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_TODO_DESCRIPTION = "UPDATE_TODO_DESCRIPTION";

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodoTitle = (id: number, newTitle: string) => ({
  type: UPDATE_TODO_TITLE,
  payload: { id, newTitle },
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const addComment = (todoId: number, comment: Comment) => ({
  type: ADD_COMMENT,
  payload: { todoId, comment },
});

export const updateComment = (
  todoId: number,
  commentIndex: number,
  newText: string,
) => ({
  type: UPDATE_COMMENT,
  payload: { todoId, commentIndex, newText },
});

export const deleteComment = (todoId: number, commentIndex: number) => ({
  type: DELETE_COMMENT,
  payload: { todoId, commentIndex },
});

export const updateTodoDescription = (id: number, newDescription: string) => ({
  type: UPDATE_TODO_DESCRIPTION,
  payload: { id, newDescription },
});
