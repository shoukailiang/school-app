import { MsgType } from '@/store/chatReducer'
import { Toast  } from 'antd-mobile'
import axios from 'axios'

export type ResType = {
  code: number
  data?: DataType
  msg?: string,
  msgs?:MsgType[],
  users?:object,
}

export type DataType = {
  [key: string]: any
}

const instance = axios.create({
  timeout: 10 * 10000
})

instance.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType

    const { data, code, msg, msgs, users } = resData
    if (code !== 0) {
      if (msg) {
        Toast.show({
            icon: 'fail',
            content: msg,
          })
      }

      throw new Error(msg)
    }
    // TODO 后期改
    if(data===undefined){
      // 判断msgs和users是否有，任意一个有的话就返回他们
      if(msgs||users){
        return {msgs,users}
      }
    }
    return data as any
  },
  (err) => {
    throw new Error(err)
  }
)

export default instance
