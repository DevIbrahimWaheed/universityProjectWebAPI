/**

* A module that is in-charged of CRUD operation it acts as a middleware for the routes instead of being in the routers area

* @module controllers/directMsgModel.controller

* @author Ibrahim Waheed

* @see route/* for the interaction with the routes  */
const DirectMsg = require('../models/directMsgModel')



const prefix = '/api/v1/msg'


// use by both!
exports.createMsg = async(ctx,next) =>{
  try{
    const id = ctx.params.id
    const {text} = ctx.request.body // stored in react state for first post 
    const createdMessage =  await new DirectMsg({
      message:{
        text:text 
      },
      users:[{
        user:id
      }],
      sender:id
      
    })
    console.log(createdMessage);
    await createdMessage.save()
    const message =  await DirectMsg.find({ 'users.user':id })
    .sort({ updatedAt: -1 })
    .limit(20)

    ctx.status =200
    ctx.body={
      data:message,

    }
  }
  catch(e){
    ctx.status = 400
    ctx.body ={
      msg:"ERROR!"
    }
    console.log(e)

  }
}


// kind of a update put you actual create a new message which will ref users frontend match the user ids for admin to responsed
exports.updateMsgAdmin = async (ctx,next) =>{
  try{ 
  const {adminid,text , user} = ctx.request.body // user from readMSG which will allow access to sender ID
  console.log("admin:",adminid,"text:",text,"user:",user)
  const message =  await new DirectMsg({
    message:{
      text:text
    },
    sender:adminid,
    users:[{user:user},{user:adminid}],
  })
  await message.save()
  const messageData =  await DirectMsg.find({ 'users.user':user })
    .sort({ updatedAt: -1 })
    .limit(20)

  ctx.status =200
  ctx.body={
   data:messageData,

  }

  }
  catch(err){
    ctx.status = 400
    ctx.body ={
      msg:"ERROR!"
    }
    console.log(err)
  }

}



  



exports.readMsgUser = async(ctx,next)  =>{


  try{
  const id = ctx.params.id
  const message =  await DirectMsg.find({ 'users.user':id })
    .sort({ updatedAt: -1 })
    .limit(20)
    
    ctx.status =200
    ctx.body={
      data:message,
      links:{
        post:`${ctx.protocol}s://${ctx.host}${prefix}/${id}/send`,
      }
  
    }
    console.log(ctx.body)
  }
  catch(e)
  {
    console.log(e)
    ctx.status = 400
    ctx.body ={
      msg:"ERROR!"
    }
  }
  

  
}

exports.readMsgAdmin = async(ctx,next) =>{
  // USE PAGNATION HERE
  
  const user = ctx.params.user;
  console.log(user)
  const message =  await DirectMsg.find({"users.user":user})
  .sort({ updatedAt: -1 })
  .limit(5)
  console.log(message)
  ctx.status =200
  ctx.body={
    data:message,

  }
}

  exports.getListofSenders= async(ctx,next) =>{
    try{
    console.log("work")
    // this is powerful /:user/readmsg
    const list = await DirectMsg.collection.distinct("users.user")
    const body = list.map(el=>{
      const links ={
        post:`${ctx.protocol}s://${ctx.host}${prefix}/adminsend`,
        readchats:`${ctx.protocol}s://${ctx.host}${prefix}/${el}/readmsg`
      }
      const activeUser = {
        id:el
      }
     
      return {links ,activeUser}

    })

    console.log(ctx.body)
    ctx.status = 200
    ctx.body= {
      body
  }
}
catch(e){
  ctx.status = 400
  ctx.body ={
    msg:"bad request"
  }
}
}


