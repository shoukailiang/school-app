const mongoose = require("mongoose"); 
// 链接mongo 
const DB_URL = 'mongodb://127.0.0.1:27018/ant-pc-recruit';
mongoose.connect(DB_URL);
const models = {
  user: {
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    type: { type: String, required: true },
    //头像
    avatar: { type: String },
    //职位名
    title: { type: String },
    //个人简介或者职位简介
    desc: { type: String },
    // 如果你是boss还有两个字段
    company: { type: String },
    money: { type: String },
  },
  chat: {
    chatid: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    read: { type: Boolean, default: false },
    content: { type: String, required: true, default: '' },
    create_time: { type: Number, default: Date.now }
  }
};
// 批量创建
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]), m);
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};
