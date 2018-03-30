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
# 启动react
npm start 
# 启动node服务
cd server && npm start 
```
## 如何链接mongodb？
- 默认你已经安装好mongodb,配好mongodb的环境变量，不配也没关系，多打几个路径而已
- 在某一盘符下新建一个boss-mongodb(名字随意)，里面新建data,etc,logs三个文件夹
- data是存放数据的，etc是配置文件，logs是日志
- 在etc下新建mongo.conf
```
# 内容范例
#数据库路径 
dbpath=/home/shoukailiang/Desktop/boss-mongodb/data
# 日志输出文件路径 
logpath=/home/shoukailiang/Desktop/boss-mongodb/logs/mongodb.log
# 错误日志采用追加模式，配置这个选项后mongodb的日志文件会追加到现有的日志文件，而不是重新创建一个文件 
logappend=true

# 过滤一些无用的日志 
quiet=false

# 启动日志文件，默认启动 
journal=true

# 端口号，默认是27017 
port=27018
```
- 需要注意的是：linux和window的文件分隔符是不一样的，pwd打一下就知道了
- 在etc文件里面运行 mongod --config mongo.conf （指定配置文件）
# 目前已经完成的功能
- 登录注册的简单实现
- boss和牛人的信息完善页面（填写招聘信息，选择头像...）
- boss查看牛人列表
- 牛人查看boss
- 个人中心
- 用户的退出
- 聊天信息的数量
- 牛人和boss的聊天
## 正在做的
- 完善页面的美观程度

## 注意
- 若前端页面npm start报错，下一个redux的chrome插件就好了 `Redux DevTools`
- 若还是报错，全局装一个`nodemon` 

