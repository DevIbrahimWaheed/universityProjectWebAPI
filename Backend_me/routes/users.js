/**

* A module that charge of User route 
* @module routes/users

* @author Ibrahim Waheed

* @see app/* which uses this via app.use()  */





const Router = require('koa-router');
const userControllers = require("../controllers/usersModel.controller")
const router = Router({prefix: '/api/v1'});
const auth = require('../controllers/auth.controller')
const roleaccess = require("../controllers/role-grantaccess.controller")
const google = require('../controllers/google-controller')
const {validateUsers,validateUsersPass,validateAdminGetAll,validateTokenData} = require('../controllers/validation.controller')




router.get('/',userarea)
// core components for guest! // ask colin 29th on using RBAC on these!
router.post('/signup',validateUsers, userControllers.signUpUser)
router.post('/login',validateUsers, userControllers.login) 




router.get('/login/google',google.googleLogin)
router.post('/auth/google',google.googleTest)



router.get('/:id/user',auth,roleaccess.grantAccess("readOwn","userarea"),userControllers.getUser)
// for password change
router.put('/:id/user',auth,roleaccess.grantAccess("updateOwn","userarea"),validateUsersPass, userControllers.updateUserPass)

//Only admin user can delete user  user must send help request to delete account THIS IS HARD DELETE
router.del('/:id/user',auth,roleaccess.grantAccess("deleteAny","userarea"), userControllers.delUser)




//admin only
router.get('/users',auth , roleaccess.grantAccess("readAny","usersarea","admin"),userControllers.getUsers)

async function userarea(ctx){
    try{
    ctx.status = 201
    ctx.body = {msg : "API for Admin only!"}
    }
    catch(err){
        ctx.status = 404
    }
    
}



/** Route ready to be used in app.js */
module.exports = router;
