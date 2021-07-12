/**

* A module that is in-charged of CRUD operation it acts as a middleware for the routes instead of being in the routers area

* @module controllers/applicationModel.controller

* @author Ibrahim Waheed

* @see route/* for the interaction with the routes  */
const Application = require('../models/applicationModel');
const Users = require('../models/usersModel') // send email data to read all .... 
const prefix = '/api/v1/form';
const nodemailer = require("nodemailer");



exports.createForm = async(ctx,next) =>{
  try {

    const id = ctx.params.id
    const { company_name, 
      company_address,company_type,license_type,application_status,img} = ctx.request.body

      //!STORE BASE64 IN BUFFER! 
       let base64data = img 
      if(!base64data){
        base64data = ''
      }
      
const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'tldapiservices@gmail.com',
            pass: 'dogcat@@@21' // naturally, replace both with your real credentials or an application-specific password
          }
        });
        

  
      const created_form = await new Application(
        {user:id,
         company_name, 
        company_address,
        company_type,
        license_type,
        application_status:'new',
        isActive:true,
        img:base64data
   
      });
      console.log(created_form);
      await created_form.save()
       ctx.status = 200
       ctx.body = {
        id:created_form,
        message:"form has been created",
         status: ctx.response.status}
   
         

      // send email to 
  await transporter.sendMail({
    from: '"TLD API Service" <tldapiservices@gmail.com>', // sender address
    to: "tldapiservices@gmail.com", // list of receivers
    subject: `Application user ${id} has created his application`, // Subject line
    text: "Make sure to update Applcation", // plain text body

  });   
      

  } catch (error) {
    ctx.status = 401
    ctx.body = {msg:"Form has not been Created"}
    console.log(error);
    return await next(error)
    
    
  } 

}

exports.readAllForms = async(ctx,next) =>{
  try{
 
   // '/:formid/updatestatus
   
  
  const forms = await Application.find({}) // send all forms
  const count = await Application.countDocuments({})
  ctx.status = 200;
 

  const data =  forms.map( form =>{
    
    const {_id,user,application_status} = form
    const links ={
      updatestatus:`${ctx.protocol}s://${ctx.host}${prefix}/${_id}/updatestatus`
    }
    return {links,_id,application_status,user}
  })
  let body = []
  for (var key in data) {
    const userD = await Users.findById(data[key].user)
    email = userD.email
    console.log(email)
    
    body.push({
      _id:data[key]._id,
      user:data[key].user,
      application_status:data[key].application_status,
      email:email,
      links:data[key].links
    }
      )
    body.push()
  
    
    
    
}
console.log(body)


 
  ctx.response.body = {
    body,
    totalCount:count}
  
  }catch(err){
    ctx.status = 400
    ctx.body ={
      msg : "Error cannot Read"
    }
    console.log(err)
  }
}

exports.readFormUser = async(ctx,next)=>{
 
  try{
   
    // from mongo its _id !
    
    const id= ctx.params.id;
    console.log(id);
    const forms = await Application.find({user:id , isActive:true})
    const count = await Application.countDocuments({user:id , isActive:true})
    if(!forms) return next(Error('User does not exist'));
   

    const body = forms.map(form =>{
     
      const {_id,company_name,
        company_address,
        company_type,application_status,user,license_type,img} = form
      const links ={
        delform:`${ctx.protocol}s://${ctx.host}${prefix}/${user}/${_id}/softdelform`
      }
  
  
      return {links,_id,company_name,
        company_address,
        company_type,application_status,user,license_type,img}
    })
    ///console.log(body ,"body")
 
    ctx.status = 202
    ctx.response.body = {
      body,
      totalCount:count,
           
    }

    
    
  }
  catch(err){
    ctx.status = 401
    ctx.body = {
      msg:"Error"
      
    }
    console.log(err)
  }


}



exports.updateSoftDel = async(ctx,next) =>{
  console.log("test")
  
  try{
  const formid = ctx.params.formid
  await Application.findByIdAndUpdate(formid,{isActive:false})
  ctx.response.status = 202
  ctx.response.body = {
    msg : "Form is Deleted to Recover see Recover Forms"
  }

  }
  catch(err){
    ctx.status = 400
     ctx.response.body = {
      msg: "Error could not updated"
      }
    console.log(err)
  }

}


exports.readSoftDel = async(ctx,next)=>{

  try{
    
    // from mongo its _id !
    const id= ctx.params.id;
    console.log(id);
    const form = await Application.find({user:id , isActive:false})
    console.log(form)
    if(!form) return next(Error('User does not exist'));
    ctx.status = 200
    ctx.response.body = {
      data:form    
    }
    
    
  }
  catch(err){
    ctx.status = 400
    ctx.response.body = {
      msg: "Error could not updated"
      }
    console.log(err)
  }


}


exports.updateRecoverSoftDel = async(ctx,next) =>{
  
  try{
  const formid = ctx.params.formid
  await Application.findByIdAndUpdate(formid,{isActive:true})
  ctx.response.status = 202
  ctx.response.body = {
    msg : "Form is  Recover see check status"
  }
  }
  catch(err){
    ctx.status = 400
     ctx.response.body = {
      msg: "Error could not updated"
      }
    console.log(err)
  }



}



exports.updateFormAmend = async(ctx,next) =>{
  
  try{
  const formid = ctx.params.formid
  const updateform = ctx.request.body
  await Application.findByIdAndUpdate(formid,updateform)
  const form = await Application.find({_id:formid})
  ctx.response.status = 202
  ctx.response.body = {
    form:form
  }
  }
  catch(err){
    ctx.status = 400
     ctx.response.body = {
      msg: "Error could not updated"
      }
    console.log(err)
  }



}









// admin only
exports.updateformStatus = async(ctx,next) =>{
  try {
    const formid = ctx.params.formid
    const {application_status} = ctx.request.body
    console.log(formid)
    console.log(application_status)
     //const doesformExist = await Application.exists({_id:formid})
    await Application.findByIdAndUpdate(formid,{$set:{application_status:application_status}})
    const forms = await Application.find({})
    const count = await Application.countDocuments({})
    ctx.status = 200;
   const data =  forms.map( form =>{
    
    const {_id,user,application_status} = form
    const links ={
      updatestatus:`${ctx.protocol}s://${ctx.host}${prefix}/${_id}/updatestatus`
    }
    return {links,_id,application_status,user}
  })
  let body = []
  for (var key in data) {
    const userD = await Users.findById(data[key].user)
    email = userD.email
    // need array
    
    body.push({
      _id:data[key]._id,
      user:data[key].user,
      application_status:data[key].application_status,
      email:email,
      links:data[key].links
    }
      )
    body.push()
  
    
    
    
}
console.log(body)


  ctx.response.body = {
    body,
    totalCount:count}
  


  } catch (error) {
    ctx.status = 400
    ctx.body = {
      message : "Error Update Status Application"
    }
    console.log(error)
    
  }
}

exports.test = ()=>{
  console.log(Application.jsonSchema())
}


 


