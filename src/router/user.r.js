/*global db*/
import express from 'express';
import responseHandler from './responseHandler';

let router = express.Router();

router.post('/user',async (req, res, next) => {
  let body = req.body;
  let newUser = {
    username: body.username, 
    password: body.password, 
    email: body.email
  }
  try{
    let mes = await db.User.create(newUser);
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'duplicate username');
  }
});

router.get('/user',async (req, res, next) => {
  let data = await db.User.findAll();
  data.forEach(function (e, i) {
    e.password = undefined;
  })
  responseHandler(res,true,data);
});

router.post('/login',async (req, res, next) => {
  let user = await db.User.findOne({ where: {username: req.body.username} });
  if(user && user.password === req.body.password){
    req.session.user = user.username;
    req.session.uid = user.id;
    responseHandler(res,true,'success');
  }else
    responseHandler(res,false,'info error');
});

router.get('/islogin',async (req, res, next) => {
  if(req.session.uid){
    responseHandler(res,true,true);
  }else
    responseHandler(res,true,false);
});

export default router;