const {google} = require('googleapis')
const Users = require('../models/usersModel')
const Application = require('../models/applicationModel');


const oauth2Client = new google.auth.OAuth2(
   

   
  );

// above localhost must be switch! https://jackson-metal-3000.codio-box.uk/google ... i used localhost because of VS studio so yea whoever is reading this!
// 
 




const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile', // get user info
  'https://www.googleapis.com/auth/userinfo.email',   // get user email ID and if its verified or not
  ];

/**
 * Protoype of google sign in code style is bad as sign in is include basically  - 
 * This module geenrate the router middlware to access the login details from google using the scopes
 * 
 * @module controllers/google-controller
 * @param  {ctx}  the context from koa allows req and res calls to be made
 */
exports.googleLogin = function (ctx) {
  
 const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope:scopes,
    prompt: "consent",
    state: "GOOGLE_LOGIN",
    

  });
   ctx.body = {data:url}
  
}
/**
 * Protoype and In development of google sign in code style is bad as sign in is include basically  - 
 * you can sign up via google but  have to login locally .. and used a set password , this was done to ensure no big changes to the middleware
 * 
 * @module controllers/google-controller
 * @param  {} ctx the context from koa allows req and res calls to be made
 */
 const bcrypt = require('bcrypt')
 const utils = require('../config/jwt.config')
 
async function hashPassword(password){
  return await bcrypt.hash(password,10);
}

async function passwordValidate(non_hash_pass,hash_pass){
  return await bcrypt.compare(non_hash_pass,hash_pass);
}
exports.googleTest= async(ctx)=>{
  const code = ctx.request.body
  console.log(code)
  let {tokens} = await oauth2Client.getToken(code);  // 
  let oauth2A = new google.auth.OAuth2();
  oauth2A.setCredentials({access_token: tokens.access_token});    // use the new auth client with the access_token
  let oauth2 = google.oauth2({auth: oauth2A,version: 'v2'});
  let { data } = await oauth2.userinfo.get();    // get user info

  //------------------------Test------------------------------------------------//
  // const { email, password, role} = ctx.request.body instead of this u willl
  const hash_pass = await hashPassword("1234") // prompt the user to use 1234 
  const user = await Users.findOne({email:data.email})
  console.log(user)
  if(!user){
 const addnewUser = Users.create({email:data.email, password:hash_pass});
  console.log(addnewUser)
  ctx.status = 200
  const jwt =  utils.issueJWT(addnewUser)  // oauth method you would ideally use google ones which are in tokens
  ctx.body ={
    token:jwt.token,
    expiresIn:jwt.expires }
  }
  else{
 const tokenObject = utils.issueJWT(user)
    ctx.status = 200
    ctx.response.body = {
      token:tokenObject.token , 
      expiresIn:tokenObject.expires
    }

  }
}

  
 



