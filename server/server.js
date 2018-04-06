const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser')
const userRoute = require('./user');
const app = express();
const model = require('./model.js');
const Chat = model.getModel('chat');
// work with express socket.io和express绑定在一起
const server = require('http').Server(app);
const io = require('socket.io')(server)
app.use(cookieParse());
app.use(bodyParse.json())

// 设置静态资源
app.use('/',express.static(path.resolve('build')))
// 中间件
app.use(function(req,res,next){
  // 设置一下白名单
  if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})

// 监听到连接，参数socket指的是当前这次连接的socket,请求，io是指全局的请求
// io是全局的请求，socket是当前这次连接的请求
io.on('connection', (socket) => {
  console.log('user login')
  //监听客户端的sendmsg事件，处理传递过来的参数
  socket.on('sendmsg', (data) => {
    // console.log(data)
    // 把data广播到全局
    // io.emit('recvmsg', data)
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ from, to, chatid, content: msg }, function (err, doc) {
      // console.log(doc)
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use('/user', userRoute)
server.listen(9999, () => {
  console.log("服务开启在9999");
})