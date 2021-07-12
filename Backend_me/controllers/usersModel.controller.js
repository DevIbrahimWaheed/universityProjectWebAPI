/**

* A module that is in-charged of CRUD operation it acts as a middleware for the routes instead of being in the routers area

* @module controllers/usersModel.controller

* @author Ibrahim Waheed

* @see route/* for the interaction with the routes 
*/
const Users = require('../models/usersModel')
const bcrypt = require('bcrypt')
const utils = require('../config/jwt.config')


async function hashPassword(password){
  return await bcrypt.hash(password,10);
}

async function passwordValidate(non_hash_pass,hash_pass){
  return await bcrypt.compare(non_hash_pass,hash_pass);
}

exports.signUpUser = async(ctx,next)=>{
  
try{
  const { email, password, role} = ctx.request.body
  const hash_pass = await hashPassword(password)
  const addnewUser =  await Users.create({email, password:hash_pass, role:role|| 'user'});
  ctx.status = 200
  const jwt = await utils.issueJWT(addnewUser)
  ctx.body ={
    token:jwt.token,
    expiresIn:jwt.expires

  }
}
catch(error){
  
  ctx.status = 404
  ctx.body = {
     msg:"error"
  }
  return await next(error)
}
}

exports.login = async (ctx,next) =>{
  try{
    const {email, password} = ctx.request.body;
    const user = await Users.findOne({email});
    if(!user){
      ctx.body ={
        msg:"Email does not exist"
      }
    }
    const validPass = await passwordValidate(password, user.password)
   
    if(!validPass) {
      ctx.body ={
        msg:"password is incorrect"
      }
    }
    if(validPass){
    const tokenObject = utils.issueJWT(user)
    ctx.status = 200
    ctx.response.body = {
      token:tokenObject.token , 
      expiresIn:tokenObject.expires
    }    
  }
 
}catch(error){
    ctx.status = 404
    
      ctx.body ={
        msg:"error"
      }
    
    console.log(error)
    return await next(error)
  }
}




// only admin //jsdoc needed
exports.getUsers = async (ctx, next) =>{
  try{
  console.log("test")
  const users = await Users.find({})

  ctx.status = 200;
  ctx.response.body = {data:users};
  }catch(err){
    ctx.status = 404
    ctx.body ={
      msg:"Error"
    }
  }

}


exports.getUser = async(ctx , next) =>{

  try{
    // from mongo its _id !
    const id= ctx.params.id;
    console.log(id);
    
    const user = await Users.findById(id)
    console.log(user)
    if(!user) return next(Error('User does not exist'));
    ctx.status = 200
    ctx.response.body = {data:user}
    
    
  }
  catch(err){
    ctx.status = 404
    ctx.body ={
      msg:"Error"
    }
    console.log(err)
  }
    
}





exports.updateUserPass = async function(ctx,next){
  try{
    const {password} = ctx.request.body
    const id = ctx.params.id;
    const hash_pass = await hashPassword(password)
    console.log(hash_pass,password)
    await Users.findByIdAndUpdate(id,{$set:{password:hash_pass}})
    ctx.status = 201
    const user = await Users.findById(id)
    console.log(user)
    ctx.response.body = {message:"User password is updated",status:ctx.response.status}
    
    
    
    
  }
  catch(err){
    console.log(err)
      return await next(err)
  }
}



// admin only! also add JSON validation !
exports.updateUser = async function(ctx, next) {
  try{
    const update = ctx.request.body
    const id = ctx.params.id;
    await Users.findByIdAndUpdate(id,update)
    const user = await Users.findById(id)
    console.log(user)
    ctx.status = 200
    ctx.response.body = {data:user,message:"done",status:ctx.response.status}
    return await next()
   
  }
  
  catch(error){
    console.log(error)
    return await next(error)
  }
}


exports.delUser = async(ctx, next) =>{
  try{
    const id = ctx.params.id;
    const doesUserExist = await Users.exists({_id:id})
    if(doesUserExist){
    await Users.findByIdAndDelete(id)
    ctx.status = 200
    ctx.response.body = {data : null , message:"User is delete"}
    return await next()
    }
    else{
      // this should never trigger because role grant access will no allow this and front end  delete endpoint will no be in 
      // users
      ctx.status = 401
      ctx.response.body = {message:"you should not be here"}
    }
  }
  catch(error){
    console.log(error);
    return await next(error)
  }
}



// only admin should be able to use this CRUD operation 
exports.readall = async()=>{
  const data = await Users.find({})
  
  console.log(data)
  return data

}

// RBAC check
exports.roleRBAC = async(ctx,next) =>{
  try{
  const data = await Users.findById(ctx.params.id)
  return data.role
  }
  catch(err){
    console.error(err)
  }

}
