import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ChatStateType = {
  users: object;
  chatmsg: any[];
  unread: number;
};
const initialState: ChatStateType = {
  users: {},
  chatmsg: [],
  unread: 0,
};

export const chatSlice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
    getMsgListReducer: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          (v) => !v.read && v.to === action.payload.userid
        ).length,
      };
    },
    msgRecvReducer: (state, action: PayloadAction<any>) => {
      // 发给我的才要+1
      const n = action.payload.data.to === action.payload.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.data],
        unread: state.unread + n,
      };
    },
    msgReadReducer: (state, action: PayloadAction<any>) => {
      const { from, num } = action.payload
      // 如果from和v.from相同的话，设置成treu，否侧还是原来的read状态
      return {
        ...state,
        chatmsg: state.chatmsg.map((v) => ({
          ...v,
          read: from === v.from ? true : v.read,
        })),
        unread: state.unread - num,
      };
    },
  },
});

export const { getMsgListReducer,msgRecvReducer,msgReadReducer } = chatSlice.actions;
const chatReducer = chatSlice.reducer;

export default chatReducer;
