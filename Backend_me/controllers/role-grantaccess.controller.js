/**

* A module that is in-charged of RBAC operation it acts as a middleware for the routes instead of being in the routers area

* @module controllers/role-grantaccess.controller

* @author Ibrahim Waheed

* @see route/* for the interaction with the routes  */
const {roles} = require('../roles')
const userController = require('./usersModel.controller')



exports.grantAccess = function(action, resource,role=null) {
  return async (ctx, next) => {
 

   try {
      let permission
      if(!role){
        const role = await userController.roleRBAC(ctx,next)
        console.log(role , "role type is")
        permission = roles.can(role)[action](resource);
        console.log(permission.granted)
      if (!permission.granted) {
        return (ctx.status = 401,ctx.body={
         error: "You don't have enough permission to perform this action"
        });
       }
       }
     
       else{
        console.log(role)
       }
     
    
 
      
   
    await next()
   } catch (error) {
     ctx.status = 409
     ctx.body = {
       msg:"you have no access rights"
     }
    console.log(error)
   }
  }
}