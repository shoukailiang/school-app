# boss-recruitment
> webpack+react全家桶+ant-design+express+mongodb+socket.io 全栈开发招聘页面

# 技术栈
- **React16**
- **redux** 管理状态
- **react-redux**
- **react-thunk** 处理异步
- **react-router4** 路由
- **ant-design** 蚂蚁金服UI组件库
- **express**构建服务
- **mongodb** 存储数据
- **scss** 预编译器
- **styled-component** 让样式也能变成组件
- **socket.io**  通信
- **socket.io-client**  socket.io的客户端

# 启动项目
```
# 下载前端依赖
npm install 
# 下载node 依赖
cd server && npm install 
# 连接mongodb (下载好mongodb,配好环境变量)
mongo
# 启动react
npm start 
# 启动node服务
cd server && npm start 
```
# 目前已经完成的功能
- 登录注册的简单实现
- boss和牛人的信息完善页面（填写招聘信息，选择头像...）
- boss查看牛人列表
- 牛人查看boss
- 个人中心
- 用户的退出
## 正在做的
- 牛人和boss的通讯聊天
- 完善页面的美观程度
## 存在的问题
- 接受信息会有延迟，我也不知道为什么，`socket.io`上也有类似的`issus`

## 注意
- 若前端页面npm start报错，下一个redux的chrome插件就好了 `Redux DevTools
`

