/*global db*/
import express from 'express';
import responseHandler from './responseHandler';
import {checkAuth} from './responseHandler';

let router = express.Router();

router.post('/post',async (req, res, next) => {
  checkAuth(req,res,next)
  
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

export default router;