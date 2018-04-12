import axios from 'axios'
import io from 'socket.io-client'
// 由于跨域了所以要写上端口
const socket = io("ws://localhost:9999")
// 获取聊天列表
const MSG_LIST = 'MSG_LIST '
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标志已读 
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      // unread :flase和是发送给我的unread,我发送的不算
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
    case MSG_RECV:
      // 发给我的才要+1
      const n = action.payload.data.to === action.payload.userid ? 1 : 0
      return { ...state, chatmsg: [...state.chatmsg, action.payload.data], unread: state.unread + n }
    case MSG_READ:
      const { from, num } = action.payload
      // 如果from和v.from相同的话，设置成treu，否侧还是原来的read状态 
      return { ...state, chatmsg: state.chatmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })), unread: state.unread - num }
    default:
      return state
  }
}

function msglist(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}
function msgrecv(data, userid) {
  return { type: MSG_RECV, payload: { data, userid } }
}

// 从谁，发给谁
function msgRead({ userid, from, num }) {
  return { type: MSG_READ, payload: { userid, from, num } }
}

// action creater 返回的得是一个object或者函数
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    // 发送给后端，事件名字是sendmsg
    socket.emit('sendmsg', { from, to, msg })
  }
}

// 
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      console.log(data)
      const userid = getState().user._id
      dispatch(msgrecv(data, userid))
    })
  }
}

// from 来自谁发送给我的信息
export function readMsg(from) {
  return async (dispatch, getState) => {
    const res = await axios.post('/user/readmsg', { from })
    // 获取当前用户的id
    const userid = getState().user._id
    if (res.status === 200 && res.data.code === 0) {
      dispatch(msgRead({ userid, from, num: res.data.num }))
    }
  }
}

export function getMessageList() {
  return async (dispatch, getState) => {
    const res = await axios.get('/user/getmsglist')
    if (res.status === 200 && res.data.code === 0) {
      const userid = getState().user._id
      dispatch(msglist(res.data.msgs, res.data.users, userid))
    }
  }
}