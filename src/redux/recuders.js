import { combineReducers } from 'redux'
import * as ActionTypes from "./actionTypes"
import { getRedirectPath } from '../util.js'
// chatuser
const initState = {
  userlist: [],
  msg: '',
  user: '',
  type: '',
  redirectTo: '',
  chatmsg: [],
  unread: 0,
  users: {}

}
// reducer
export function chatuser(state = initState, action) {
  switch (action.type) {
    case ActionTypes.USER_LIST:
      return { ...state, userlist: action.payload }
    default:
      return state
  }
}

export function user(state = initState, action) {
  switch (action.type) {
    case ActionTypes.ERROR_MSG:
      return { ...state, msg: action.msg }
    case ActionTypes.AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case ActionTypes.LOGOUT:
      return { ...initState, redirectTo: '/login' }
    case ActionTypes.LOAD_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function chat(state = initState, action) {
  switch (action.type) {
    case ActionTypes.MSG_LIST:
      // unread :flase和是发送给我的unread,我发送的不算
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
    case ActionTypes.MSG_RECV:
      // 发给我的才要+1
      const n = action.payload.data.to === action.payload.userid ? 1 : 0
      return { ...state, chatmsg: [...state.chatmsg, action.payload.data], unread: state.unread + n }
    case ActionTypes.MSG_READ:
      const { from, num } = action.payload
      // 如果from和v.from相同的话，设置成treu，否侧还是原来的read状态 
      return { ...state, chatmsg: state.chatmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })), unread: state.unread - num }
    default:
      return state
  }
}


//合并Reducer
const reducer = combineReducers({
  chatuser,
  user,
  chat
})

export default reducer