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