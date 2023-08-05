import { configureStore } from '@reduxjs/toolkit'
import userReducer,{ UserStateType } from './userReducer'
import chatReducer, { ChatStateType } from './chatReducer';
import chatUserReducer,{ChatUserStateType} from './chatUserReducer'
export type StateType = {
  user: UserStateType,
  chat:ChatStateType,
  chatUser:ChatUserStateType
}


export default configureStore({
  reducer: {
    user:userReducer,
    chat:chatReducer,
    chatUser:chatUserReducer
  }
})

