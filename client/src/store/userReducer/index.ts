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
        },
        registerReducer: (
          state: UserStateType,
          action: PayloadAction<UserStateType>
          ) => {
            return action.payload
        }
    }
  })

export const { loginReducer,logoutReducer,registerReducer } = userSlice.actions
const userReducer = userSlice.reducer

export default userReducer