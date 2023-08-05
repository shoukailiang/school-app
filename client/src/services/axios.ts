import { Toast  } from 'antd-mobile'
import axios from 'axios'

export type ResType = {
  data?: DataType
  code: number
  msg?: string
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

    const { data, code, msg } = resData
    if (code !== 0) {
      if (msg) {
        Toast.show({
            icon: 'fail',
            content: msg,
          })
      }

      throw new Error(msg)
    }
    return data as any
  },
  (err) => {
    throw new Error(err)
  }
)

export default instance
