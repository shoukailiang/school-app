# 校园app

> vite4+react18全家桶+ahooks+ant design mobile+koa2+mongodb+socket.io 

# 技术栈
- **React18**
- **redux** 管理状态
- **react-redux**
- **react-router6** 路由
- **ant-design mobile** 蚂蚁金服UI组件库
- **koa**构建服务
- **mongodb** 存储数据
- **scss** 预编译器
- **styled-component** 让样式也能变成组件
- **socket.io**  通信
- **socket.io-client**  socket.io的客户端
- **aHooks** 好用的一些hooks

# 启动项目
```
# 下载前端依赖
npm install 
# 下载node 依赖
cd server && npm install 
# 连接mongodb (下载好mongodb,配好环境变量)
# 启动react
npm start 
# 启动node服务
npm run server
```

# 目前已经完成的功能

## 正在做的
- 完善页面的美观程度
- 后端接口完善
- 前端类型补齐
- 服务端渲染


### 打包后怎么启动
- 会发现直接打开index.html是不行的，需要用后端渲染前端html,没有3000这个端口了
- 在更目录下npm run server 
- 打开 localhost:后端端口号/login
