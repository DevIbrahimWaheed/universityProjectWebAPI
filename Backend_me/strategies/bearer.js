const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWt = require('passport-jwt').ExtractJwt
const Users = require('../models/usersModel')
const JWT_TOKEN = require('../config/jwt.config')



// check hash and here checkuser the Auth allows access to private router will also check role types or might create a new auth for role type admin users

const options = {
    jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_TOKEN.JWT_SECRET
    
}

const checktoken = async (jwt_payload , done)=>{
    try{
    const user = await Users.findOne({_id:jwt_payload.sub})
    console.log(user)
    if (user) {
        
        return done(null, user);
    } else {
        return done(null, false);
    }
}catch(err){
    if (err) {
        console.log(err)
        return done(err, false);
        
    }
    
}
}

const strategy = new JWTStrategy(options,checktoken);

module.exports = strategy;