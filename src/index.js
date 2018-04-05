import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
//处理异步,需要redux-thunk插件
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducer'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AutoRoute from './component/autoRoute/autoRoute.js'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
// 拦截器
import './config.js'
import './index.scss'
//compose对几个函数进行组合
const store = createStore(reducers, compose(
  //异步要用的中间件
  applyMiddleware(thunk),
  //调试工具
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
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
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
