import { RootState } from "../../store";

export const selectUserName = (state: RootState): string => state.user.userName;
