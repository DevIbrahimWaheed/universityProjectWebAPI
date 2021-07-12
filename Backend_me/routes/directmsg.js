/**

* A module that charge of directmessage services route
* @module routes/directmsg

* @author Ibrahim Waheed

* @see app/* which uses this via app.use()  */

const Router = require('koa-router');
const msgController = require('../controllers/directMsgModel.controller')
const prefix = '/api/v1/msg'
const router = Router({prefix:prefix});
const roleaccess = require("../controllers/role-grantaccess.controller")
const auth = require('../controllers/auth.controller')

// user type only
router.get('/:id/usermsg',auth,roleaccess.grantAccess("readOwn","msg"),msgController.readMsgUser) // send HATEOS links of post and put!
// user type can only create msg as they are senders!
router.post('/:id/send',auth,roleaccess.grantAccess("readOwn","msg"),msgController.createMsg)



// admin type only
// at front end admin can choose to resposed to mutiple senders!
router.post('/adminsend',auth,roleaccess.grantAccess("readAny","msg","admin"),msgController.updateMsgAdmin)
router.get('/:user/readmsg',auth,roleaccess.grantAccess("readAny","msg","admin"),msgController.readMsgAdmin) 
router.get('/getlists',auth,roleaccess.grantAccess("readAny","msg","admin"),msgController.getListofSenders) // send HATEOS links of get msg of user and post



/** Route ready to be used in app.js */
module.exports = router;
