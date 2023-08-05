const Koa = require('koa');
const Router = require('koa-router'); 
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie');
const utility = require('utility');
const model = require('./model.js');

const app = new Koa();
const router = new Router();
const User = model.getModel('users');
const Chat = model.getModel('chats');

app.use(bodyParser());
app.use(cookie.default());

// 注册
router.post('/register', async (ctx) => {
  const { user, pwd, type } = ctx.request.body;
  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      ctx.body = { code: 1, msg: '用户名重复' };
    } else {
      const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
      const savedUser = await userModel.save();
      const { _id } = savedUser;
      ctx.cookies.set('userid', _id);
      ctx.body = { code: 0, data: { user, type, _id } };
    }
  } catch (err) {
    ctx.body = { code: 1, msg: '后端出错了' };
  }
});

// 登陆
router.post('/login', async (ctx) => {
  const { user, pwd } = ctx.request.body;
  try {
    const foundUser = await User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0, __v: 0 });
    if (!foundUser) {
      ctx.body = { code: 1, msg: '用户名或者密码错误' };
    } else {
      ctx.cookies.set('userid', foundUser._id);
      ctx.body = { code: 0, data: foundUser };
    }
  } catch (err) {
    ctx.body = { code: 1, msg: '后端出错了' };
  }
});

// 更新用户信息
router.post('/update', async (ctx) => {
  const userid = ctx.cookies.get('userid');
  if (!userid) {
    ctx.body = { code: 1, msg: '用户已经注销' };
    return;
  }
  const body = ctx.request.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userid, body);
    const data = { user: updatedUser.user, type: updatedUser.type, ...body };
    ctx.body = { code: 0, data };
  } catch (err) {
    ctx.body = { code: 1, msg: '后端出错了' };
  }
});

// 获取用户列表
router.get('/list', async (ctx) => {
  const { type } = ctx.query;
  try {
    const userList = await User.find({ type });
    // 过滤掉userList中的pwd，__v字段
    const filteredUserList = userList.map(user => {
      const { pwd, __v, ...filteredUser } = user.toObject(); 
      return filteredUser;
    });

    ctx.body = { code: 0, data: filteredUserList };
  } catch (err) {
    ctx.body = { code: 1, msg: '后端出错了' };
  }
});

// 获取聊天信息列表
router.get('/getmsglist', async (ctx) => {
  const user = ctx.cookies.get('userid');
  try {
    const userDocList = await User.find({});
    const users = {};
    userDocList.forEach((v) => {
      users[v._id] = { name: v.user, avatar: v.avatar };
    });
    const chatList = await Chat.find({ '$or': [{ from: user }, { to: user }] });
    ctx.body = { code: 0, msgs: chatList, users };
  } catch (err) {
    ctx.body = { code: 1, msg: '后端出错了' };
  }
});

// 获取用户信息
router.get('/info', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    if (!userid) {
      ctx.body = { code: 1 };
      return;
    }
    try {
      const doc = await User.findOne({ _id: userid }, { pwd: 0, __v: 0 });
      if (doc) {
        ctx.body = { code: 0, data: doc };
      }
    } catch (err) {
      ctx.body = { code: 1, msg: '后端出错了' };
    }
  });
  
  // 标记消息为已读
  router.post('/readmsg', async (ctx) => {
    const userid = ctx.cookies.get('userid');
    const { from } = ctx.request.body;
    try {
      const result = await Chat.updateMany({ from, to: userid }, { '$set': { read: true } });
      if (result.ok === 1) {
        ctx.body = { code: 0, num: result.nModified };
      } else {
        ctx.body = { code: 1, msg: '修改失败' };
      }
    } catch (err) {
      ctx.body = { code: 1, msg: '修改失败' };
    }
  });


// 倘若一些密码很简单，会被进行暴力破解，这时候就默认给用户的密码加上一些“盐”
function md5Pwd(pwd) {
  const salt = 'sdfjlkADF_123$%^&*(_)(*&;\'.';
  return utility.md5(utility.md5(salt + pwd));
}

module.exports = router