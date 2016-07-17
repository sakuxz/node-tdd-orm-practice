/*global db*/
import express from 'express';
import responseHandler from './responseHandler';
import {checkAuth} from './responseHandler';
import multer from 'multer'

let router = express.Router();

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/upload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'pict' + '-' + Date.now())
//   }
// })
// let upload = multer({ storage: storage })
var upload = multer({
  dest: '../upload/',
  mimetype: 'image/*'
});

router.post('/post',upload.single('pict'),async (req, res, next) => {
  checkAuth(req,res,next);

  let body = req.body;
  let newPost = {
    content: body.content,
    UserId: req.session.uid
  }
  if(req.file){
    newPost.img = req.file.filename;
  }
  try{
    let mes = await db.Post.create(newPost);
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

router.get('/post',async (req, res, next) => {
  try{
    let mes = await db.Post.findAll({
      include: [ db.User,db.Like ],
      order: [['createdAt', 'DESC']]
    });
    mes.forEach(function (e, i) {
      let username = e.dataValues.User.username;
      if(e.dataValues.User.id === req.session.uid){
        e.dataValues.isYour = true;
      }else{
        e.dataValues.isYour = false;
      }
      e.dataValues.User = undefined;
      e.dataValues.username = username;
      e.dataValues.likeNum = e.dataValues.Likes.length;
      e.dataValues.isLike = false;
      e.dataValues.Likes.forEach(function(e2, i) {
        if(e2.UserId === req.session.uid)
          e.dataValues.isLike = true;
      });
    });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

router.delete('/post',async (req, res, next) => {
  checkAuth(req,res,next);
  
  try{
    let posts = await db.Post.findAll({
      where: req.body
    });
    let check = true;
    posts.forEach(function(e, i) {
      if(e.UserId !== req.session.uid)
        check = false;
    });
    if(!check){
      responseHandler(res,false,'no auth');
      return;
    }
    let mes = await db.Post.destroy({
      where: req.body
    });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

router.patch('/post',async (req, res, next) => {
  checkAuth(req,res,next);
  
  try{
    let posts = await db.Post.findAll({
      where: {
        id: req.body.id
      }
    });
    let check = true;
    posts.forEach(function(e, i) {
      if(e.UserId !== req.session.uid)
        check = false;
    });
    if(!check){
      responseHandler(res,false,'no auth');
      return;
    }
    let mes = await db.Post.update(req.body,{
      where: {
        id: req.body.id
      }
    });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});


export default router;
