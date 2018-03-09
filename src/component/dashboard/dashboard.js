import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import './dashboard.scss'
function Msg() {
  return <h2>Msg</h2>
}
@connect(
  state => state.user,
  null
)
class Dashboard extends React.Component {
  render() {
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: this.props.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: this.props.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
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
    return (
      <React.Fragment>
        <nav className="dashboard-nav">
          {navList.find(v => v.path === pathname).title}
          <NavLink data={navList}></NavLink>
        </nav>
        <Switch>
          {navList.map(v => {
            return <Route path={v.path} component={v.component} key={v.path}></Route>
          })}
        </Switch>
      </React.Fragment>
    )
  }
}

export default Dashboard;