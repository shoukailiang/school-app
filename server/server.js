const express = require('express');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser')
const userRoute = require('./user');

const app = express();
app.use(cookieParse());
app.use(bodyParse.json())

app.use('/user', userRoute)

app.listen(9999, () => {
  console.log("服务开启在9999");
})