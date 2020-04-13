const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const app = express();

//routes模块
const users = require("./routes/api/users");
const bokes = require("./routes/api/boke");

//加载config中mongoose地址文件
const db = require('./config/keys').mongoURI;


// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



mongoose.connect(db,{ useNewUrlParser: true })
    .then(()=>{
        console.log("已连接数据库");
    })
    .catch(err=>{
        console.log("未连接上" + err);
    })


// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);


app.get("/",(req,res)=>{
    res.send("hallo word");
})
//使用route
app.use('/api/users',users);
app.use('/api/bokes',bokes);
//
const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log(`端口 ${port} 已开启！！`);
})
