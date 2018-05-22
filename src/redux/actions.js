import * as ActionTypes from './actionTypes'
import axios from 'axios'
import io from 'socket.io-client'
// 由于跨域了所以要写上端口
const socket = io("ws://localhost:9999")
// chat -------------------------------------------------------------------------------------------------------------------------------


function msglist(msgs, users, userid) {
  return { type: ActionTypes.MSG_LIST, payload: { msgs, users, userid } }
}
function msgrecv(data, userid) {  
  return { type: ActionTypes.MSG_RECV, payload: { data, userid } }
}

// 从谁，发给谁
function msgRead({ userid, from, num }) {
  return { type: ActionTypes.MSG_READ, payload: { userid, from, num } }
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
// chatuser--------------------------------------------------------------------------------------------------------------- 

function userList(data) {
  return { type: ActionTypes.USER_LIST, payload: data }
}

// 请求
export function getUserList(type) {
  return async dispatch => {
    const res = await axios.get('/user/list?type=' + type)
    if (res.data.code === 0) {
      dispatch(userList(res.data.doc))
    }
  }
}
// user---------------------------------------------------------------------------------------------------------------
function errorMsg(msg) {
  return { msg, type: ActionTypes.ERROR_MSG }
}
function authSuccess(obj) {
  // 通过结构赋值的方式吧pwd字段给过滤掉
  const { pwd, ...data } = obj
  console.log(data)
  return { type: ActionTypes.AUTH_SUCCESS, payload: data }
}

export function loadData(userinfo) {
  return { type: ActionTypes.LOAD_DATA, payload: userinfo }
}

export function logoutSubmit() {
  return { type: ActionTypes.LOGOUT }
}



// 注册
export function register({ user, pwd, repwd, type }) {
  if (!user || !pwd || !repwd) {
    return errorMsg("用户名或者密码不能为空")
  }
  if (user.length < 5) {
    return errorMsg("用户名长度最少5位")
  }
  if (pwd !== repwd) {
    return errorMsg("密码和确认密码不一致")
  }
  if (pwd.length < 7) {
    return errorMsg("密码最少需要7位")
  }
  if (!type) {
    return errorMsg("请选择注册类型")
  }
  // 异步的写法
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type, _id: res.data.data._id }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
// info 

export function update(data) {
  return async dispatch => {
    const res = await axios.post('/user/update', data)
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

// 登陆
export function login({ user, pwd }) {
  if (!user || !pwd) {
    errorMsg("用户名或者密码必须输入")
  }
  return async dispatch => {
    const res = await axios.post('/user/login', { user, pwd })
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}