/**

* A module that charge of tldforms route 
* @module routes/tldforms

* @author Ibrahim Waheed

* @see app/* which uses this via app.use()  */




const Router = require('koa-router');
const roleaccess = require("../controllers/role-grantaccess.controller")
const appliControllers = require('../controllers/applicationModel.controller')
const auth = require('../controllers/auth.controller')
// will post get and post use postman to see the request


const prefix = '/api/v1/form'
const router = Router({prefix:prefix});

const {validateForm, validateStatus} = require('../controllers/validation.controller')




router.get('/',form)


router.post('/:id/create',auth,roleaccess.grantAccess("updateOwn","tldform"),validateForm,appliControllers.createForm,)

// 
router.put('/:formid/update',auth,roleaccess.grantAccess("updateOwn","tldform"),validateForm,appliControllers.updateFormAmend)


router.get('/:id',auth ,roleaccess.grantAccess("readOwn","tldform"),appliControllers.readFormUser)

// user only see its forms
router.get('/:id/seesoftdel',auth ,roleaccess.grantAccess("readOwn","tldform"),appliControllers.readSoftDel)

router.put('/:id/:formid/softdelform',auth,roleaccess.grantAccess("updateOwn","tldform") ,appliControllers.updateSoftDel)


router.put('/:id/:formid/softrecover',auth,roleaccess.grantAccess("updateOwn","tldform") ,appliControllers.updateRecoverSoftDel)




// admin only see all users from in order
router.get('/:id/readall',auth,roleaccess.grantAccess("readAny","tldform"), appliControllers.readAllForms)
//update application status also do 
router.post('/:formid/updatestatus',auth,validateStatus,roleaccess.grantAccess("updateAny","tldform","admin"),appliControllers.updateformStatus)

// can allow users to login or register to use the TLD sevices

async function form(ctx){

ctx.status = 202


}


/** Route ready to be used in app.js */
module.exports = router;
