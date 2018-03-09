const express = require('express');
const utility = require('utility')
const Router = express.Router();
const model = require('./model.js');
// 获取User模型
const User = model.getModel('user');
// 注册
Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    // create是不能拿到当前的_id的，要生成之后才有的，所以这里要改用save
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "后端出错了" })
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } })
    })

    /* 
    User.create({ user, type, pwd: md5Pwd(pwd) }, function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      return res.json({ code: 0 })
    }) */
  })
})
// 登陆
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  /* 第一个选项是查询，第二个选项（可选）是是否显示(在返回文本的时候就不会显示) ，0为不显示,_v版本号*/
  User.findOne({ user: user, pwd: md5Pwd(pwd) }, { pwd: 0, __v: 0 }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或者密码错误" })
    }
    // console.log(doc)
    // { _id: 5a8a94143b395c29a09f6e5d,
    //   user: 'test10',
    //   type: 'boss',
    //   pwd: '2464a6d5c67c3c8f248743e8fbb4069c',
    //   __v: 0 }

    // 设置cookie
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc })
  })
})

// bossinfo geniusinfo 
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  // 这边进行判断的原因是，倘若打开了两个窗口一个注销了另一个还在发请求，尴尬
  if (!userid) {
    return res.json({ code: 1, msg: "用户已经注销" })
  }
  const body = req.body
  // console.log(body) //{ title: '1', company: '1', money: '1', desc: '1', avatar: 'girl' }
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })

})

// 获取用户列表
Router.get('/list', (req, res) => {
  // 清楚所有用户
  // User.remove({},function(err,doc){})
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, doc })
  })
})


Router.get('/info', (req, res) => {
  // 获取cookie
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({
      code: 1
    })
  }
  // 如果能查到说明已经有这个cookie
  User.findOne({ _id: userid }, { pwd: 0, __v: 0 }, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" })
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})



// 倘若一些密码很简单，会被进行暴力破解，这时候就默认给用户的密码加上一些“盐”
function md5Pwd(pwd) {
  const salt = "sdfjlkADF_123$%^&*(_)(*&;'.";
  // 进行二层加密，就算是被解密出来，还是被加密的密码
  return utility.md5(utility.md5(salt + pwd))
}
module.exports = Router

// code状态码，msg错误信息，data是具体的数据