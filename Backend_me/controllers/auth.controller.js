/**

* A module that is in-charged of  exporting the middleware Bearer Authorization
* @module controllers/auth.controller

* @author Ibrahim Waheed

* @see route/* for the interaction with the routes  */

const passport = require('koa-passport')
const JWTAuth = require('../strategies/bearer')
passport.use(JWTAuth)



module.exports = passport.authenticate('jwt', {session:false});
