/*global db*/
import express from 'express';
import responseHandler from './responseHandler';
import {checkAuth} from './responseHandler';

let router = express.Router();

router.post('/post',async (req, res, next) => {
  checkAuth(req,res,next);

  let body = req.body;
  let newPost = {
    content: body.content,
    UserId: req.session.uid
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
      include: [ db.User ],
      order: [['createdAt', 'DESC']]
    });
    mes.forEach(function (e, i) {
      let username = e.dataValues.User.username;
      e.dataValues.User = undefined;
      e.dataValues.username = username;
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
      next();
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
      where: req.body
    });
    let check = true;
    posts.forEach(function(e, i) {
      if(e.UserId !== req.session.uid)
        check = false;
    });
    if(!check){
      responseHandler(res,false,'no auth');
      next();
    }
    let mes = await db.Post.update({
      where: req.body
    });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});


export default router;
