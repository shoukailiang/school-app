import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserStateType = {
  user: string,
  type: string,
}
const initialState:UserStateType = {
  user: '',
  type: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadDataReducer: ()=>{
          
        },
        loginReducer: (
          state: UserStateType,
          action: PayloadAction<UserStateType>
        ) => {
          return action.payload
        },
        logoutReducer: () => {
          return initialState
        }
    }
  })

export const { loginReducer,logoutReducer } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer