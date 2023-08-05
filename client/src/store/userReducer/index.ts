import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  _id:string,
  user: string;
  type: string;
  avatar: string;
  title: string;
  desc: string;
  // 如果是boss,还有两个字段
  company?: string;
  money?: string;
}

export type UserStateType = {
  // 存放牛人或者是boss的列表
  userList:Array<User>,
  _id:string;
  user: string;
  type: string;
  avatar: string;
  title: string;
  desc: string;
  // 如果是boss,还有两个字段
  company?: string;
  money?: string;
};
const initialState: UserStateType = {
  userList:[],
  _id:"",
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
      return {...state,...action.payload};
    },
    logoutReducer: () => {
      return initialState;
    },
    registerReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return {...state,...action.payload};
    },
    updateUserReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return {...state,...action.payload};
    },
    getUserListReducer: (
      state: UserStateType,
      action: PayloadAction<User[]>
    ) => {
      return  {...state, userList: action.payload}
    },
  },
});

export const {
  loginReducer,
  logoutReducer,
  registerReducer,
  updateUserReducer,
  getUserListReducer,
} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
