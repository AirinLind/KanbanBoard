import {
  TodoState,
  TodoActionTypes,
  ADD_TODO,
  UPDATE_TODO_TITLE,
  DELETE_TODO,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_TODO_DESCRIPTION,
} from "../types/todoTypes";

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes,
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    case UPDATE_TODO_TITLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.newTitle }
            : todo,
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case ADD_COMMENT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? { ...todo, comments: [...todo.comments, action.payload.comment] }
            : todo,
        ),
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                comments: todo.comments.map((comment, index) =>
                  index === action.payload.commentIndex
                    ? { ...comment, text: action.payload.newText }
                    : comment,
                ),
              }
            : todo,
        ),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                comments: todo.comments.filter(
                  (_, index) => index !== action.payload.commentIndex,
                ),
              }
            : todo,
        ),
      };

    case UPDATE_TODO_DESCRIPTION:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, description: action.payload.newDescription }
            : todo,
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
