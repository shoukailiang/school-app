import reducers from "./recuders"
import { createStore, applyMiddleware, compose } from 'redux'
//处理异步,需要redux-thunk插件
import thunk from 'redux-thunk'

//创建store
//compose对几个函数进行组合
const store = createStore(reducers, compose(
  //异步要用的中间件
  applyMiddleware(thunk),
  //调试工具
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
export default store
