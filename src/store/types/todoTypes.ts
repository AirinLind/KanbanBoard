export type Comment = {
  text: string;
  author: string;
};

export type Todo = {
  id: number;
  title: string;
  description?: string;
  comments: Comment[];
};

export type TodoState = {
  todos: Todo[];
};

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO_TITLE = "UPDATE_TODO_TITLE";
export const DELETE_TODO = "DELETE_TODO";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_TODO_DESCRIPTION = "UPDATE_TODO_DESCRIPTION";

type AddTodoAction = {
  type: typeof ADD_TODO;
  payload: Todo;
};

type UpdateTodoTitleAction = {
  type: typeof UPDATE_TODO_TITLE;
  payload: { id: number; newTitle: string };
};

type DeleteTodoAction = {
  type: typeof DELETE_TODO;
  payload: number;
};

type AddCommentAction = {
  type: typeof ADD_COMMENT;
  payload: { todoId: number; comment: Comment };
};

type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  payload: { todoId: number; commentIndex: number; newText: string };
};

type DeleteCommentAction = {
  type: typeof DELETE_COMMENT;
  payload: { todoId: number; commentIndex: number };
};

type UpdateTodoDescriptionAction = {
  type: typeof UPDATE_TODO_DESCRIPTION;
  payload: { id: number; newDescription: string };
};

export type TodoActionTypes =
  | AddTodoAction
  | UpdateTodoTitleAction
  | DeleteTodoAction
  | AddCommentAction
  | UpdateCommentAction
  | DeleteCommentAction
  | UpdateTodoDescriptionAction;
