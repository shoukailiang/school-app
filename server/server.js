const Koa =  require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const userRouter = require('./user');
const model = require('./model.js');

const app = new Koa();
const Chat = model.getModel('chat');

// work with Koa and socket.io
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server,{cors: true});

app.use(bodyParser());
app.use(cors());

// Listen for connections
io.on('connection', (socket) => {
  console.log('user login');
  socket.on('sendmsg', async (data) => {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    const doc = await Chat.create({ from, to, chatid, content: msg });
    io.emit('recvmsg', { ...doc._doc });
  });
});

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

server.listen(9999, () => {
  console.log("服务开启在9999");
});
