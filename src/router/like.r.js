/*global db*/
import express from 'express';
import responseHandler from './responseHandler';
import {checkAuth} from './responseHandler';

let router = express.Router();

router.post('/like',async (req, res, next) => {
  checkAuth(req,res,next);

  let body = req.body;
  let newLike = {
    PostId: body.postId,
    UserId: req.session.uid
  }
  try{
    let mes = await db.Like.create(newLike);
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

router.get('/like/:id',async (req, res, next) => {
  try{
    let mes = await db.Like.findAll({
      where: {
        PostId: req.params.id
      },
      // include: [ db.User, db.Post ]
    });
    // mes.forEach(function (e, i) {
    //   let username = e.dataValues.User.username;
    //   if(e.dataValues.User.id === req.session.uid){
    //     e.dataValues.isYour = true;
    //   }else{
    //     e.dataValues.isYour = false;
    //   }
    //   e.dataValues.User = undefined;
    //   e.dataValues.username = username;
    // });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

router.delete('/like/:id',async (req, res, next) => {
  checkAuth(req,res,next);
  
  try{
    let mes = await db.Like.destroy({
      where: {
        UserId: req.session.uid,
        PostId: req.params.id
      }
    });
    responseHandler(res, true, mes);
  }catch (e){
    responseHandler(res,false,'database err');
  }
});

export default router;
