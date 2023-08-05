import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
  user: string;
  type: string;
  avatar: string;
  title: string;
  desc: string;
  // 如果是boss,还有两个字段
  company: string;
  money: string;
};
const initialState: UserStateType = {
  user: "",
  type: "",
  avatar: "",
  title: "",
  desc: "",
  // 如果是boss,还有两个字段
  company: "",
  money: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadDataReducer: () => {},
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload;
    },
    logoutReducer: () => {
      return initialState;
    },
    registerReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload;
    },
    updateUserReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload;
    },
  },
});

export const { loginReducer, logoutReducer, registerReducer,updateUserReducer } =
  userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
