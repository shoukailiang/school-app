import React from 'react'
import axios from 'axios'
/* 引入后就能变成路由组件 */
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '@/redux/user.redux'
@withRouter
@connect(
  null,
  { loadData }
)
class AutoRoute extends React.Component {
  componentDidMount() {
    var publicList = ['/register', '/login']
    var pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) !== -1) {
      return null
    }
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 有登录信息
            // 其实是为了解决刷新的时候虽然页面不跳转但是，数据没了
            this.props.loadData(res.data.data)
          } else {
            // 无登录信息
            this.props.history.push('/login')
          }
        }
      })
  }

  render() {
    return null
  }
}
export default AutoRoute