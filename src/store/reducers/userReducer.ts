import { UserState, UserActionTypes } from "../types/userTypes";
import { SET_USER_NAME } from "../actions/userActions";

const initialState: UserState = {
  userName: "",
};

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.payload };

    default:
      return state;
  }
};

export default userReducer;
