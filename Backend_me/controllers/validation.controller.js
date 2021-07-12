/**
 * A module to run JSON Schema based validation on request/response data.
 * @module controllers/validation.controller
 * @author Ibrahim Waheed 
 * @see schemas/* JSON based Schema allows a validation layer when data is incoming
 */
const {Validator,ValidationError} = require('jsonschema')



const tldUpdateStatus = require('../schema/formUpdate.json').definitions.formUpdate
const tldCreateStatus = require('../schema/formCreateUserType.json').definitions.formCreateUserType
/** Base of by mongoose to json  */
const userCreate = require('../schema/users.json').definitions.user
const userPass = require('../schema/users.json').definitions.requestpass
const adminGetAll = require('../schema/users.json').definitions.GetUsers



/**
 * Wrapper that returns a Koa middleware validator for a given  JSON schema.
 * @param {object} schema - The Must be a JSON schema definition of the resource
 * @param {string} resource - The name of the resource tldform , users
 * @returns {function} - A Koa middleware handler taking (ctx, next) params
 */
const ValidatorKoa = (schema,resource) =>{
    
    const valid = new Validator();
    const validationOptions = {
    throwError:true,
    propertyName:resource
    }
    /**
     * Koa middleware handler which will do the validation
     * @param {object} ctx - part of Koa request/response context object
     * @param {function} next - callback function koa
     * @throws {ValidationError} jsonscehema lib for error exception 
     */
    const koaHandler = async (ctx,next) =>{
        const body = ctx.request.body;

        try{
         
            valid.validate(body,schema,validationOptions)
            await next()
        }catch(error){
            if(error instanceof ValidationError){
                console.error(error)
                ctx.status = 400
                ctx.body = error
            }
            else{
                console.log(error)
                throw error
            }

        }
    }
    return koaHandler
}


/** Validate data against formCreateUserType schema */
exports.validateForm= ValidatorKoa(tldCreateStatus,'tld')
/** Validate data against user schema */
exports.validateUsers= ValidatorKoa(userCreate,'user')
/** Validate data against user schema */
exports.validateUsersPass= ValidatorKoa(userPass,'user')
/** Validate data against user schema */
exports.validateAdminGetAll= ValidatorKoa(adminGetAll,'user')
// /** Validate data against user schema */
// exports.validateTokenData= ValidatorKoa(tokenData,'user')
/** Validate data against formupdate schema */
exports.validateStatus =ValidatorKoa(tldUpdateStatus,'tld')