export default function(res, status, mes){
  if(status){
    res.status(200).json({
      status: status,
      data: mes
    })
  }else{
    res.status(417).json({
      status: status,
      data: mes
    })
  }
}

export function checkAuth(req,res,next){
  if(!req.session.uid){
    res.status(417).json({
      status: false,
      data: 'no auth'
    })
    next();
  }
}