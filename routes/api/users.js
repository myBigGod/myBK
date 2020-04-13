const express = require("express");
const route = express.Router();

const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const passport = require("passport");
//引入数据模型
const userModel = require("../../model/userModel");




//引入config配置
const keys = require("../../config/keys");

route.get("/test",(req,res)=>{
    res.json({
        meg:"assass"
    });
})

//用户注册接口
route.post("/register",(req,res)=>{
    userModel.findOne({email:req.body.email}).then(user=>{
        if(user){
            return res.status(404).json("该邮箱已被注册！");
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              });
            
              bcrypt.genSalt(10,function(err,salf){
                  bcrypt.hash(newUser.password,salf,(err,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save().then(user=>{
                        res.json(user)
                    })
                    .catch(err=>{
                        return res.json({
                            msg:err
                        });
                    });

                  })

              })
        }
    })
})


//用户登陆接口
route.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    userModel.findOne({email}).then(user=>{
        if(!user){
           return res.status(404).json("邮箱不存在！")
        }
        
        bcrypt.compare(password,user.password).then(isMath=>{
            if(isMath){
                const rule = {
                    id: user.id,
                    name: user.name,
                };
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                });
            }
            else{
                return res.status(400).json('密码错误!');
            }
        })
        
    })
    
})

//token测试接口
route.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      });
    }
  );

module.exports = route;