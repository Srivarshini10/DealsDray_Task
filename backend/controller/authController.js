const LoginModel = require("../model/userModel");

exports.getUser=async(req,res,next)=>{
  try{
    const user=await LoginModel.find()
    res.status(200).json(user)
}
catch(err){
    next(err)
}
}
