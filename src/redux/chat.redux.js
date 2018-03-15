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
  chatimg: [],
  unread: 0
}
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatimg: action.payload, unread: action.payload.filter(v => !v.unread).length }
    case MSG_RECV:
      return { ...state, chatimg: [...state.chatimg, action.payload], unread: state.unread + 1 }
    default:
      return state;
  }
}

function msglist(data) {
  return { type: MSG_LIST, payload: data }
}
function msgrecv(data) {
  return { type: MSG_RECV, payload: data }
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
  return dispatch => {
    socket.on('recvmsg', function (data) {
      console.log(data)
      dispatch(msgrecv(data))
    })
  }
}

export function getMessageList() {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msglist(res.data.msgs))
        }
      })
  }
}