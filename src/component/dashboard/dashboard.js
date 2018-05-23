import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMessageList, recvMsg } from '@/redux/actions'
import QueueAnim from 'rc-queue-anim'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import './dashboard.scss'


@connect(
  state => state,
  { getMessageList, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    // 是在dashboard页面获取信息
    if (!this.props.chat.chatmsg.length) {
      this.props.getMessageList()
      this.props.recvMsg()
    }
  }
  render() {
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '求职列表',
        component: Boss,
        hide: this.props.user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: '招聘列表',
        component: Genius,
        hide: this.props.user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '我的消息',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    const { pathname } = this.props.location
    const page = navList.find(v => v.path === pathname)
    // 让动画生效，只渲染一个Route,根据当前的path决定组件
    return page?(
      <React.Fragment>
        <div className="dashboard-top">
          {page.title}
        </div>
        <QueueAnim className="dashboard-wrapper" type="scaleX" delay={300} >
          <Route path={page.path} component={page.component} key={page.path}></Route>
        </QueueAnim>
        <nav className="dashboard-nav">
          <NavLink data={navList}></NavLink>
        </nav>
      </React.Fragment>
    ):<Redirect to='/msg'></Redirect>   
  }
}
export default Dashboard