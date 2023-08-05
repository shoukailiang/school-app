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

export type ChatUserStateType = {
  // 存放牛人或者是boss的列表
  userList:Array<User>,
};
const initialState: ChatUserStateType = {
  userList:[],
};

export const chatUserSlice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
    getUserListReducer: (
      state: ChatUserStateType,
      action: PayloadAction<User[]>
    ) => {
      return  {...state, userList: action.payload}
    },
  },
});

export const {
  getUserListReducer,
} = chatUserSlice.actions;
const chatUserReducer = chatUserSlice.reducer;

export default chatUserReducer;
