const express = require("express");
const router = express();
const passport = require('passport');

//数据模型
const boke = require('../../model/bokeModel');



///
router.get('/test', (req, res) => {
    res.json({ msg: 'bokes' });
});

// @route  GET api/profiles
// @desc   获取所有信息
// @access Private

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        boke.find()
        .then(boke => {
          if (!boke) {
            return res.status(404).json('没有任何内容');
          }
  
          res.json(boke);
        })
        .catch(err => res.status(404).json(err));
    }
  );


// @route  POST api/bokes/add
// @desc   创建信息接口
// @access Private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const bokeFields = {};
  
      if (req.body.type) bokeFields.type = req.body.type;
      if (req.body.title) bokeFields.title = req.body.title;
      if (req.body.content) bokeFields.content = req.body.content;
      if (req.body.star) bokeFields.star = req.body.star;
      new boke(bokeFields).save().then(boke => {
        res.json(boke);
      });
    }
  );
// @desc   编辑信息接口
// @access Private
router.post(
    '/edit/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const bokeFields = {};
  
        if (req.body.type) bokeFields.type = req.body.type;
        if (req.body.title) bokeFields.title = req.body.title;
        if (req.body.content) bokeFields.content = req.body.content;
        if (req.body.star) bokeFields.star = req.body.star;
  
      boke.findOneAndUpdate(
        { _id: req.params.id },
        { $set: bokeFields },
        { new: true }
      ).then(boke => res.json(boke));
    }
  );
  


// @desc   删除信息接口
// @access Private
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        boke.findOneAndRemove({ _id: req.params.id })
        .then(boke => {
            boke.save().then(boke => res.json(boke));
        })
        .catch(err => res.status(404).json('删除失败!'));
    }
  );


module.exports=router;