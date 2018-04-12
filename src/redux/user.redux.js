import axios from 'axios'
import { getRedirectPath } from '../util.js'
// action
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const ininState = {
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
}
// renducer 
export function user(state = ininState, action) {
  switch (action.type) {
    case ERROR_MSG:
      return { ...state, msg: action.msg }
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOGOUT:
      return { ...ininState, redirectTo: '/login' }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// action creater 
function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}
function authSuccess(obj) {
  // 通过结构赋值的方式吧pwd字段给过滤掉
  const { pwd, ...data } = obj
  return { type: AUTH_SUCCESS, payload: data }
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}

export function logoutSubmit() {
  return { type: LOGOUT }
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
          dispatch(authSuccess({ user, pwd, type }))
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