import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AutoRoute from './component/autoRoute/autoRoute.js'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({
      hasError: true
    })
  }
  render() {
    return this.state.hasError ?
      <h2>页面出错了</h2>
      : (
        <div>
          {/* 检验是否有登录信息 */}
          <AutoRoute />
          {/* 有了switch后，匹配到path后就不会再匹配下去了 */}
          <Switch>
            <Route path="/bossinfo" component={Bossinfo}></Route>
            <Route path="/geniusinfo" component={Geniusinfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/chat/:user' component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      )
  }
}
export default App