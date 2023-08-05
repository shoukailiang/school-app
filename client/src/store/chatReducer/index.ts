import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export type ChatStateType = {
  
};
const initialState: ChatStateType = {
  userList:[],
};

export const chatSlice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
    
  },
});

export const {
} = chatSlice.actions;
const chatReducer = chatSlice.reducer;

export default chatReducer;