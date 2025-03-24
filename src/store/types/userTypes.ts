import { SET_USER_NAME } from "../actions/userActions";

export type UserState = {
  userName: string;
};

export type SetUserNameAction = {
  type: typeof SET_USER_NAME;
  payload: string;
};

export type UserActionTypes = SetUserNameAction;
