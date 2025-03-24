export const SET_USER_NAME = "SET_USER_NAME";

export const setUserName = (name: string) => ({
  type: SET_USER_NAME,
  payload: name,
});
